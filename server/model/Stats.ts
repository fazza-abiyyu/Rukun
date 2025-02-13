import { PrismaClient, Category } from '@prisma/client';

const prisma = new PrismaClient();

interface FlowCashStats {
  total_cashFlowperMonth: number[];
  categories: string[];
}

export class Stats {
  // Get total users
  static async totalUser() {
    const totalUser = await prisma.user.count();
    return totalUser;
  }

  // Get total citizens
  static async totalCitizen() {
    const totalCitizen = await prisma.citizen.count();
    return totalCitizen;
  }

  // Get total male citizens
  static async totalCitizenMale() {
    const totalMaleCitizen = await prisma.citizen.count({
      where: {
        gender: 'Male',
      },
    });
    return totalMaleCitizen;
  }

  // Get total female citizens
  static async totalCitizenFemale() {
    const totalFemaleCitizen = await prisma.citizen.count({
      where: {
        gender: 'Female',
      },
    });
    return totalFemaleCitizen;
  }

  // Get ratio of children by gender (citizens under 17 years old)
  static async getRatioChildByGender() {
    const today = new Date();
    const cutoffDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

    // Count children by gender
    const childMale = await prisma.citizen.count({
      where: {
        gender: 'Male',
        dob: {
          gte: cutoffDate,
        },
      },
    });

    const childFemale = await prisma.citizen.count({
      where: {
        gender: 'Female',
        dob: {
          gte: cutoffDate,
        },
      },
    });

    const totalChildren = childMale + childFemale;
    const ratioMale = childMale / totalChildren;
    const ratioFemale = childFemale / totalChildren;

    return {
      male: ratioMale,
      female: ratioFemale,
    };
  }
  static async getFlowCash(): Promise<FlowCashStats> {
    // Get cash flow per month
    const cashFlows = await prisma.cashFlow.groupBy({
      by: ['category', 'date'],
      _sum: {
        amount: true,
      },
      where: {
        date: {
          gte: new Date(new Date().getFullYear(), 0, 1), // Start from January 1st this year
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  
    const totalCashFlowPerMonth: number[] = new Array(12).fill(0); // Array to hold monthly totals
    const categories = Object.values(Category);
  
    cashFlows.forEach((flow) => {
      const month = flow.date.getMonth();
      if (flow._sum.amount) {
        // Convert BigInt to number, ensuring the values are within the valid range
        const amount = Number(flow._sum.amount); // Explicit conversion to `number`
        totalCashFlowPerMonth[month] += amount;
      }
    });
  
    return {
      total_cashFlowperMonth: totalCashFlowPerMonth,
      categories: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
    };
  }
}  
