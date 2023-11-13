import bcrypt from bcrypt

export const resetPasswordRoute = {
    path: '/api/users/:passwordREsetCode/reset-password',
    method: 'put',
    handler: async (req, res) => {
        const { passwordResetCode } = req.params;
        const { newPassword } = req.body;
        // Code will likely not be used, leaving it incomplete.
        // const db = getDbConnection('react-auth-db');

        const newPasswordHash = await bcrypt.hash(newPassword, 10);

        // const result = await db.collection('users')
        //     .findOneAndUpdate({ passwordResetCode }, {
        //         $set: { passwordHash: newPasswordHash },
        //         $unset: { passwordResetCode: '' },
        //     });

        // if (result.lastErrorObject.n === 0) return res.sendStatus(404);

        res.sendStatus(200);
    },
}

