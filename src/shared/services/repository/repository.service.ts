import { IBaseRepositoryBuilder } from "@/infra/repository";

export let repositoryService: IBaseRepositoryBuilder;

export function setRepositoryService(service: IBaseRepositoryBuilder) {
  repositoryService = service;
}
