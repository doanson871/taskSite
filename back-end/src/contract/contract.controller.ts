import {
  Controller,
  Delete,
  Get,
  Patch,
  Post,
  UseGuards,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { GetUser } from 'src/auth/decorator';
import { MyJwtGuard } from 'src/auth/guard';
import { InsertContractDTO, UpdateContractDTO } from './dto';
import { ContractService } from './contract.service';

@UseGuards(MyJwtGuard)
@Controller('contract')
export class ContractController {
  constructor(private contractService: ContractService) {}

  @Get('/allContracts')
  getAllContracts(@GetUser('id') userId: number) {
    return this.contractService.getAllContracts(userId);
  }

  @Post('postContract')
  postContract(
    @GetUser('id') userId: number,
    @Body() insertContractDTO: InsertContractDTO,
  ) {
    return this.contractService.postContract(userId, insertContractDTO);
  }

  @Patch(':id')
  updateContract(
    @Param('id', ParseIntPipe) contractId: number,
    @Body() updateContractDTO: UpdateContractDTO,
  ) {
    return this.contractService.updateContract(contractId, updateContractDTO);
  }

  @Delete(':id')
  deleteContract(@Param('id', ParseIntPipe) contractId: number) {
    return this.contractService.deleteContract(contractId);
  }
}
