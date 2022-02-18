import prismaClient  from '../prisma';

class GetLast3MessagesService {
  async execute() {
    const messages = await prismaClient.message.findMany({ 
      take: 3, // 3 items
      orderBy: {
        created_at: "desc" // item last
      },
      include: {
        user: true // include model user infos
      }
    });

    return messages;
  }
}

export { GetLast3MessagesService }