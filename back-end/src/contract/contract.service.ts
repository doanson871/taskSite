import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { InsertContractDTO, UpdateContractDTO } from './dto';

@Injectable()
export class ContractService {
  constructor(private prismaService: PrismaService) {}
  async getAllContracts(userId: number) {}
  async postContract(userId: number, insertContractDTO: InsertContractDTO) {}
  async updateContract(
    contractId: number,
    updateContractDTO: UpdateContractDTO,
  ) {}
  async deleteContract(contractId: number) {}
}
