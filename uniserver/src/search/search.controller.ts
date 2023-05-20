import { Controller, Get, Logger, Query, UseGuards } from '@nestjs/common';
import { AppAccessGuard } from 'src/guards/app-access.guard';
import { SearchService } from './search.service';

@Controller('search')
@UseGuards(AppAccessGuard)
export class SearchController {

  private logger = new Logger(SearchController.name)

  constructor(private searchService: SearchService) { }

  @Get()
  search(@Query('query') query: string) {
    this.logger.debug(`Search Query: ${query}`);
    return this.searchService.query(query);
  }
}
