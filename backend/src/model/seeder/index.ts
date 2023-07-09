import { seedClient } from './clientSeeder';
import { seedComponent } from './componentSeeder';
import { seedDevice } from './deviceSeeder';
import { seedEmployee } from './employeeSeeder';
import { seedFile } from './fileSeeder';
import { seedOperation } from './operationSeeder';
import { seedProto } from './prototypeDevSeeder';
import { seedSystem } from './systemSeeder';
import { seedVersion } from './versionSeeder';

const seed = () => {
    seedClient();
    seedComponent();
    seedDevice();
    seedEmployee();
    seedFile();
    seedOperation();
    seedProto();
    seedSystem();
    seedVersion();
}

export {seed}