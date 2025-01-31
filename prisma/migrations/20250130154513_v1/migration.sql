-- CreateTable
CREATE TABLE "Room" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roomName" TEXT NOT NULL,
    "description" TEXT,
    "capacity" INTEGER NOT NULL,
    "password" TEXT,
    "private" BOOLEAN NOT NULL DEFAULT false,
    "published" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expired" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "idRoomGame" INTEGER,
    "idUserCreator" INTEGER NOT NULL,
    CONSTRAINT "Room_idRoomGame_fkey" FOREIGN KEY ("idRoomGame") REFERENCES "Game" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "Room_idUserCreator_fkey" FOREIGN KEY ("idUserCreator") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Game" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gameName" TEXT NOT NULL,
    "genre" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User_Room" (
    "idUser" INTEGER NOT NULL,
    "idRoom" INTEGER NOT NULL,
    "roleInRoom" TEXT NOT NULL,
    "dateUnion" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,

    PRIMARY KEY ("idUser", "idRoom"),
    CONSTRAINT "User_Room_idUser_fkey" FOREIGN KEY ("idUser") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "User_Room_idRoom_fkey" FOREIGN KEY ("idRoom") REFERENCES "Room" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" TEXT,
    "active" BOOLEAN NOT NULL DEFAULT true,
    "acceptNotifications" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_User" ("active", "createdAt", "email", "id", "password", "role", "updatedAt") SELECT "active", "createdAt", "email", "id", "password", "role", "updatedAt" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Game_gameName_key" ON "Game"("gameName");
