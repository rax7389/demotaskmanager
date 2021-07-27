import * as fs from 'fs';
import * as path from 'path';

export class ErrorLogger {
  private static writer = fs.createWriteStream(
    path.join(__dirname, 'error.log'),
    { flags: 'a' }
  );

  public static errorLogger(error) {
    const now = new Date();
    const log = `${now.toISOString()} ${error}\r\n`;
    ErrorLogger.writer.write(log);
  }
}
