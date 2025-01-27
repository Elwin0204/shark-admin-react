/** The storage namespace */
declare namespace StorageType {
  interface Session {
    appStorage: {
      state: {
        lang: UnionKey.LangKey;
      }
    }
  }

  interface Local {
    appStorage: {
      state: {
        lang: UnionKey.LangKey;
      }
    }
  }
}
