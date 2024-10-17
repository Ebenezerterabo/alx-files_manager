import redisClient from '../utils/redis';
import dbClient from '../utils/db';

class AppController {
  // GET /status - return redis and DB status
  static getstatus(req, res) {
    const redisAlive = redisClient.isAlive();
    const dbAlive = dbClient.isAlive();
    return res.status(200).json({ redis: redisAlive, db: dbAlive });
  }

  // GET /stats - return redis and DB stats
  static async getstats(req, res) {
    try {
      const usersCount = await dbClient.nbusers();
      const filesCount = await dbClient.nbfiles();
      return res.status(200).json({ users: usersCount, files: filesCount });
    } catch (err) {
      return res.status(500).json({ error: err });
    }
  }
}

export default AppController;
