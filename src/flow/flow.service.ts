import {
  Injectable,
  NotFoundException,
  Inject,
  forwardRef,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Flow } from './flow.entity';
import { NewFlow } from './newFlow.dto';
import { AppService } from '../app/app.service';
import { FlowRepository } from './flow.repository';
import { Pagination } from './../pagination';
import { FlowPagination } from './flow.pagination';
import { Like } from 'typeorm';

@Injectable()
export class FlowService {
  constructor(
    @InjectRepository(FlowRepository)
    private readonly flowRepository: FlowRepository,
    @Inject(forwardRef(() => AppService))
    private readonly appService: AppService,
  ) {}

  async findAll(): Promise<Flow[]> {
    return await this.flowRepository.find();
  }

  async paginate(options: FlowPagination): Promise<Pagination<Flow>> {
    const [results, total] = await this.flowRepository.findAndCount({
      take: options.limit,
      skip: options.page,
      where: {
        name: Like('%' + options.name + '%'),
        description: Like('%' + options.description + '%'),
        technologies: Like('%' + options.technologies + '%'),
      },
      order: {
        updateDate: 'DESC',
      },
    });
    if (options.page >= total) throw new BadRequestException();
    return new Pagination<Flow>({ results, total });
  }

  async findById(id: number): Promise<Flow> {
    const theFlow = await this.flowRepository.findOneById(id);
    return theFlow.orElseThrow(() => new NotFoundException());
  }

  async findByName(flowName: string): Promise<Flow[]> {
    const flows = await this.flowRepository.findByName(flowName);
    return flows.orElseThrow(() => new NotFoundException());
  }

  async createFlow(newFlow: NewFlow): Promise<Flow> {
    const existingSourceApp = await this.appService.findById(
      newFlow.sourceAppId,
    );
    const existingTargetApp = await this.appService.findById(
      newFlow.targetAppId,
    );
    let flow = new Flow();
    flow.name = newFlow.name;
    flow.description = newFlow.description;
    flow.technologies = newFlow.technologies;
    flow.sourceApp = existingSourceApp;
    flow.targetApp = existingTargetApp;
    flow = await this.flowRepository.save(flow);
    return flow;
  }

  async deleteFlow(idFlow: number): Promise<void> {
    const existingFlow = await this.flowRepository.findOneById(idFlow);
    existingFlow.ifPresentOrElse(
      async theFlow => {
        await this.flowRepository.remove(theFlow);
      },
      () => new NotFoundException(),
    );
  }
}
