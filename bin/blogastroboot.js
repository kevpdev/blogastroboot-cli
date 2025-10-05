#!/usr/bin/env node
import { program } from "commander";
import initCmd from "../src/commands/init.js";
import updateCmd from "../src/commands/update.js";

program.name("blogastroboot").description("CLI BlogAstroBoot").version("1.0.0");
program.addCommand(initCmd).addCommand(updateCmd);
await program.parseAsync(process.argv);
