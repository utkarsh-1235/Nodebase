//import { z } from 'zod';
import {createTRPCRouter, protectedProcedure } from '../init';
import prisma from '@/lib/db';
export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(({ctx}) => {
    return prisma.user.findMany({
      where: {
        id: ctx.auth.user.id
      }
    });
  }),

  createWorkflows: protectedProcedure.mutation(async () => {
    
    //Fetch the workflow
    await new Promise((resolve) => setTimeout(resolve,5_000));

    // Transcribe the video
    await new Promise((resolve) => setTimeout(resolve,5_000));

    // Send the transcription to openai
    await new Promise((resolve) => setTimeout(resolve,5_000));
    return prisma.workflow.create({
      data: {
        name: "My First Workflow",
      }
    })
  }),

  getWorkflows: protectedProcedure.query(({ctx}) => {
     return prisma.workflow.findMany()
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;