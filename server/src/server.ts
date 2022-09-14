import 'dotenv/config';

import { PrismaClient } from '@prisma/client';
import express, { Request, Response } from 'express';
import cors from 'cors';

import { convertHourStringToMinutes } from './utils/convertHourStringToMinutes';
import { convertMinutesToHourString } from './utils/convertMinutesToHourString';

const app = express();
app.use(express.json());
app.use(cors);

const prisma = new PrismaClient();

app.get('/games', async (_request: Request, response: Response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true,
        }
      }
    }
  });

  return response.status(200).json(games);
});

app.post('/games/:id/ads', async (request: Request, response: Response) => {
  const { id } = request.params;
  const body = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId: id,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  });

  return response.status(201).json(ad);
});

app.get('/games/:id/ads', async (request: Request, response: Response) => {
  const { id: gameId } = request.params;
  
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId
    },
    orderBy: {
      createdAt: 'desc',
    }
  });

  return response.status(200).json(ads.map((ad) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    };
  }));
});

app.get('/ads/:id/discord', async (request: Request, response: Response) => {
  const { id } = request.params;
  
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id
    }
  });
  
  return response.status(200).json({ discord: ad?.discord });
});

app.listen(process.env.PORT, () => console.log(`Server is running on Port: ${process.env.PORT}!`));
