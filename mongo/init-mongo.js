db.createUser(
    {
        user: "adprogramming",
        pwd: "adprogramming",
        roles: [
            {
                role: "readWrite",
                db: "adprogramming"
            }
        ]
    }
);