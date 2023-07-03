import type { NextApiRequest, NextApiResponse } from 'next';
import { roqClient } from 'server/roq';
import { prisma } from 'server/db';
import { authorizationValidationMiddleware, errorHandlerMiddleware } from 'server/middlewares';
import { dnsLogValidationSchema } from 'validationSchema/dns-logs';
import { convertQueryToPrismaUtil } from 'server/utils';
import { getServerSession } from '@roq/nextjs';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { roqUserId, user } = await getServerSession(req);
  switch (req.method) {
    case 'GET':
      return getDnsLogs();
    case 'POST':
      return createDnsLog();
    default:
      return res.status(405).json({ message: `Method ${req.method} not allowed` });
  }

  async function getDnsLogs() {
    const data = await prisma.dns_log
      .withAuthorization({
        roqUserId,
        tenantId: user.tenantId,
        roles: user.roles,
      })
      .findMany(convertQueryToPrismaUtil(req.query, 'dns_log'));
    return res.status(200).json(data);
  }

  async function createDnsLog() {
    await dnsLogValidationSchema.validate(req.body);
    const body = { ...req.body };
    if (body?.analysis_result?.length > 0) {
      const create_analysis_result = body.analysis_result;
      body.analysis_result = {
        create: create_analysis_result,
      };
    } else {
      delete body.analysis_result;
    }
    const data = await prisma.dns_log.create({
      data: body,
    });
    return res.status(200).json(data);
  }
}

export default function apiHandler(req: NextApiRequest, res: NextApiResponse) {
  return errorHandlerMiddleware(authorizationValidationMiddleware(handler))(req, res);
}
