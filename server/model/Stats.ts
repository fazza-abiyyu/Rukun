import { PrismaClient, Category } from '@prisma/client';
import { CashFlow } from './CashFlow';

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

  // // Get ratio of children by gender (citizens under 17 years old)
  // static async getRatioChildByGender() {
  //   const today = new Date();
  //   const cutoffDate = new Date(today.getFullYear() - 17, today.getMonth(), today.getDate());

  //   // Count children by gender
  //   const childMale = await prisma.citizen.count({
  //     where: {
  //       gender: 'Male',
  //       dob: {
  //         gte: cutoffDate,
  //       },
  //     },
  //   });

  //   const childFemale = await prisma.citizen.count({
  //     where: {
  //       gender: 'Female',
  //       dob: {
  //         gte: cutoffDate,
  //       },
  //     },
  //   });

  //   const totalChildren = childMale + childFemale;
  //   const ratioMale = childMale / totalChildren;
  //   const ratioFemale = childFemale / totalChildren;

  //   return {
  //     male: ratioMale,
  //     female: ratioFemale,
  //   };
  // }
static getCashFlowDashboard = async (year: number) => {
    const startDate = new Date(year, 0, 1);
    const endDate = new Date(year + 1, 0, 1);

    const results: { category: string; amount: number; create_at: Date }[] = await prisma.cashFlow.findMany({
        where: {
            create_at: {
                gte: startDate,
                lt: endDate
            }
        },
        select: {
            category: true,
            amount: true,
            create_at: true
        }
    });

    const CashFlow = {
        Debit: new Array(12).fill(0),
        Kredit: new Array(12).fill(0),
    };

    results.forEach(result => {
        const month = new Date(result.create_at).getMonth();
        if (result.category === 'Debit') {
            CashFlow.Debit[month]++;
        } else if (result.category === 'Kredit') {
            CashFlow.Kredit[month]++;
        }
    });

    let totals = 0;
    CashFlow.Kredit.forEach((item: number) => {
        totals += item;
    });

    CashFlow.Debit.forEach((item: number) => {
        totals += item;
    });

    return {
        CashFlow: [
            {
                name: 'Masuk',
                data: CashFlow.Debit,
            },
            {
                name: 'Keluar',
                data: CashFlow.Kredit,
            }
        ],
        totals: totals,
        categories: [
            'January', 'February', 'March', 'April', 'May', 'June',
            'July', 'August', 'September', 'October', 'November', 'December'
        ],
    };
};
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

  return {
          anak: [childMale, childFemale],
          label: ["Laki - Laki", "Perempuan"],
          totals: totalChildren
      
  };
}


}
