

export function encodeCursor(cursor: {[key: string]: any}): string {
  const sCursor = JSON.stringify(cursor);
  return Buffer.from(sCursor, "utf8").toString("base64");
}

export function decodeCursor(cursor: string): {[key: string]: any}{
  try {
    const sCursor = Buffer.from(cursor, "base64").toString("utf8");
    return JSON.parse(sCursor);
  } catch (e) {
    return {};
  }
}