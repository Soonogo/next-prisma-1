import { PrismaClient } from "@prisma/client";
// 初始化 Prisma Client
const prisma = new PrismaClient();
import example from "./example.json";
//@ts-nocheck
async function main() {
  const category  = await prisma.category.create({
    data: {
      name: "数学",
    },
  });
  const chapters = example?.outlines.reduce((res:any, item:any) => {
    item.lectures.forEach((lecture:any) => {
      res.push({
        title: lecture.title ?? lecture.en_title ?? "",
        cover: lecture.resource.cover_url,
        url: lecture.resource.content[0].url,
      });
    });

    return res;
  }, []);

  console.log(chapters);

  await prisma.video.create({
    data: {
      title: example.title,
      pic: example.cover_url,
      desc: example.brief,
      categoryId:category.id,
      authorId:1,
      chapter: {
        createMany: {
          data: chapters,
        },
      },
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    // 关闭 Prisma Client
    await prisma.$disconnect();
  });
