import { VimState } from '../../state/vimState';
import { ExCommand } from '../../vimscript/exCommand';
import { LineRange } from '../../vimscript/lineRange';

export class GotoLineCommand extends ExCommand {
  public async execute(vimState: VimState): Promise<void> {
    return;
  }

  public override async executeWithRange(vimState: VimState, range: LineRange): Promise<void> {
    const newLine = range.resolve(vimState).end;

    vimState.postponedCodeViewChanges.push({
      command: 'revealLine',
      args: {
        lineNumber: newLine,
        at: 'center',
      },
    });

    vimState.cursorStartPosition = vimState.cursorStopPosition = vimState.cursorStopPosition
      .with({ line: newLine })
      .obeyStartOfLine(vimState.document);
  }
}
