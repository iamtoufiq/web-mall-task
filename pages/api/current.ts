import { NextApiRequest, NextApiResponse } from "next";

import serverAuth from "@/libs/serverAuth";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ error: "Method not allowed. Only GET requests are supported." });
  }

  try {
    const { currentUser } = await serverAuth(req, res);

    // Assuming currentUser is not undefined and is the expected user object
    return res.status(200).json(currentUser);
  } catch (error) {
    console.error(error);
    // Provide a more descriptive error message to the client
    return res.status(400).json({ error: "Failed to authenticate user." });
  }
}
