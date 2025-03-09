import { prisma } from "../../../shared/dB/prismaConnect";
import { rapidApiService } from "../../FundServices/services/rapidApi";

export const updateUserPortfolioValue = async (userUuid: string) => {
    const investments = await prisma.investment.findMany({
      where: { userUuid },
      include: {
        scheme: true
      }
    });
  
    if (investments.length === 0) {
      return 0;
    }
  
    const latestNavData = await rapidApiService.getLatestNav();
    
    let totalValue = 0;
    
    for (const investment of investments) {
      const navData = await rapidApiService.getNavForScheme(investment.scheme.schemeCode, latestNavData);
      
      if (navData) {
        const latestNav = parseFloat(navData.NAV);
        
        if (investment.scheme.nav !== latestNav) {
          await prisma.scheme.update({
            where: { uuid: investment.scheme.uuid },
            data: {
              nav: latestNav,
              lastUpdated: new Date(navData.Date)
            }
          });
          
          await prisma.navHistory.create({
            data: {
              schemeUuid: investment.scheme.uuid,
              nav: latestNav,
              date: new Date(navData.Date)
            }
          });
        }
        
        totalValue += investment.units * latestNav;
      } else {
        totalValue += investment.units * investment.scheme.nav;
      }
    }
  
    await prisma.user.update({
      where: { uuid: userUuid },
      data: {
        portfolioValue: totalValue
      }
    });
  
    return totalValue;
  };