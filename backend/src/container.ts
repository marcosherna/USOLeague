import { container } from "tsyringe";
import { DataSource } from "typeorm";

import { AppDataSource } from "./database/data-source";

container.registerInstance(DataSource, AppDataSource);

export default container;
