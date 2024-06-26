import "dotenv/config";
import { drizzle } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";

import * as schema from "../db/schema";

const sql = neon(process.env.DB_URL!); 
// @ts-ignore
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log("Seeding database");

    // delete does not delete the tables, but instead, deletes all of the contents
    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    // insert our courses into our schema
    await db.insert(schema.courses).values([
      {
        id: 1,
        title: "Skeletal System",
        imageSrc: "/bone.svg",
      },
      {
        id: 2,
        title: "Nervous System",
        imageSrc: "/nerve.svg",
      },
      {
        id: 3,
        title: "Organ Syatem",
        imageSrc: "/brain.svg",
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1, // Skeletal
        title: "Unit 1",
        description: "Learn the basics of the Skeletal System!",
        order: 1,
      }
    ]);

    await db.insert(schema.lessons).values(
        [
            {
              id: 1,
              unitId: 1, // Assuming unitId 1 corresponds to the skeletal system unit
              order: 1,
              title: "Introduction to the Skeletal System",
            },
            {
              id: 2,
              unitId: 1,
              order: 2,
              title: "Types of Bones",
            },
            {
              id: 3,
              unitId: 1,
              order: 3,
              title: "Bone Structure",
            },
            {
              id: 4,
              unitId: 1,
              order: 4,
              title: "Joints and Movement",
            },
            {
              id: 5,
              unitId: 1,
              order: 5,
              title: "Common Skeletal Disorders",
            }
          ]          
);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1, // title: "Introduction to the Skeletal System",
        type: "SELECT",
        order: 1,
        question: 'Which one of these is NOT a function of the skeletal system?',
      },
      {
        id: 2,
        lessonId: 1, // title: "Introduction to the Skeletal System",
        type: "ASSIST",
        order: 2,
        question: 'Not a Skeletal System function',
      },
      {
        id: 3,
        lessonId: 1, // title: "Introduction to the Skeletal System",
        type: "SELECT",
        order: 3,
        question: 'Which bone is commonly referred to as the "collarbone"?',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1, // Which one of these is NOT a function of the skeletal system?
        imageSrc: "/bone.svg",
        correct: false,
        text: "Support",
      },
      {
        challengeId: 1,
        imageSrc: "/bone.svg",
        correct: false,
        text: "Protection",
      },
      {
        challengeId: 1,
        imageSrc: "/bone.svg",
        correct: false,
        text: "Transportation",
      },
      {
        challengeId: 1,
        imageSrc: "/bone.svg",
        correct: true,
        text: "Storage of Minerals",
      },
    ]);

    await db.insert(schema.challengeOptions).values([
        {
          challengeId: 2, // Which one of these is NOT a function of the skeletal system?
          correct: false,
          text: "Support",
        },
        {
          challengeId: 2,
          correct: false,
          text: "Protection",
        },
        {
          challengeId: 2,
          correct: false,
          text: "Transportation",
        },
        {
          challengeId: 2,
          correct: true,
          text: "Storage of Minerals",
        },
      ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3, // Which one of these is referred to as the collar bone?
        imageSrc: "/bone.svg",
        correct: false,
        text: "the femur",
      },
      {
        challengeId: 3,
        imageSrc: "/bone.svg",
        correct: false,
        text: "the radius",
      },
      {
        challengeId: 3,
        imageSrc: "/bone.svg",
        correct: true,
        text: "the clavicle",
      },
    ]);

    await db.insert(schema.challenges).values([
        {
          id: 4,
          lessonId: 2, // title: "Introduction to the Skeletal System",
          type: "SELECT",
          order: 1,
          question: 'Which one of these is NOT a function of the skeletal system?',
        },
        {
          id: 5,
          lessonId: 2, // title: "Introduction to the Skeletal System",
          type: "ASSIST",
          order: 2,
          question: 'Functions of the Skeletal System',
        },
        {
          id: 6,
          lessonId: 2, // title: "Introduction to the Skeletal System",
          type: "SELECT",
          order: 3,
          question: 'Which bone is commonly referred to as the "collarbone"?',
        },
      ]);
    console.log("Seeding finished");
  } catch (error) {
    console.error(error);
    throw new Error("Failed to seed the database");
  }
};

main();

