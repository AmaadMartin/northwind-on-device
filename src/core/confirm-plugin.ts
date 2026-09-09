/**
 * @license
 * Copyright 2026 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import { BasePlugin } from '@google/adk';

/** A write action the agent asked for but did not perform. */
export interface Proposal {
  id: string;
  tool: string;
  args: Record<string, unknown>;
}

/**
 * Stops the model from ever causing a side effect.
 *
 * Read-only tools run normally. Any tool named in `writeTools` is intercepted:
 * the call is recorded as a proposal and never executed. ADK treats the object
 * returned here as the tool result, so the agent continues its turn and can tell
 * the user what it has prepared.
 *
 * The user then clicks a button, and the application calls the tool directly.
 * Natural language decides *what* to propose; a human decides whether it runs.
 */
export class ConfirmWritesPlugin extends BasePlugin {
  readonly proposals: Proposal[] = [];

  constructor(private readonly writeTools: ReadonlySet<string>) {
    super('confirm-writes');
  }

  override async beforeToolCallback({
    tool,
    toolArgs,
  }: {
    tool: {name: string};
    toolArgs: Record<string, unknown>;
  }): Promise<Record<string, unknown> | undefined> {
    if (!this.writeTools.has(tool.name)) return undefined;

    const id = `p${this.proposals.length + 1}`;
    this.proposals.push({id, tool: tool.name, args: toolArgs});
    return {
      status: 'awaiting_confirmation',
      proposalId: id,
      note: 'Prepared for the user to confirm. Not performed.',
    };
  }

  take(): Proposal[] {
    return this.proposals.splice(0, this.proposals.length);
  }
}
