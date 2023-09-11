import admin from 'firebase-admin';
import express from 'express';
const router = express.Router();

// Initialize Firebase Admin SDK (as shown in previous responses)

// Reference to the Firebase Realtime Database
const db = admin.database();
const membersRef = db.ref('members');

// Create a new member
const createMember = (req, res) => {
    const { name, description, team, startDate, endDate } = req.body;

    if (!name || !description || !team || !startDate || !endDate) {
        return res.status(400).json({ error: 'Incomplete member data.' });
    }

    const newmemberRef = membersRef.push({
        name,
        description,
        team,
        startDate,
        endDate,
    });

    return res.status(201).json({ id: newmemberRef.key });
};

// Get all members
const listMembers = (req, res) => {
    try {
        membersRef.once('value', (snapshot) => {
            const members = [];
            snapshot.forEach((childSnapshot) => {
                const member = childSnapshot.val();
                member.id = childSnapshot.key;
                members.push(member);
            });
            res.status(200).json(members);
        });
    } catch (err) {
        return res.status(500).json({
            message: `Something happened ${err}`
        })
    }
};

// Get a member by ID
const getMemberById = async (req, res, memberId, next) => {
    try {
        const { uid } = req.params;

        await membersRef.child(memberId).once('value', (snapshot) => {
            const member = snapshot.val();
            if (!member) {
                return res.status(404).json({ error: 'member not found.' });
            }
            member.id = memberId;
            res.status(200).json(member);
            next();
        });
    } catch (err) {
        return res.status(500).json({
            message: "Something happened"
        })
    }
};

// Update a member by ID
const updateMember = (req, res, next, uid) => {
    try {
        const { uid } = req.params;
        const { name, description, team, startDate, endDate } = req.body;

        if (!name || !description || !team || !startDate || !endDate) {
            return res.status(400).json({ error: 'Incomplete member data.' });
        }

        membersRef.child(uid).update({
            name,
            description,
            team,
            startDate,
            endDate,
        });

        res.status(200).json({ message: 'member updated successfully.' });
    } catch (err) {
        return res.status(500).json({
            message: 'Something happened'
        })
    }
};

// Delete a member by ID
const deleteMember = (req, res, next, uid) => {
    const { uid } = req.params;

    membersRef.child(uid).remove()
        .then(() => {
            res.status(204).send({
                message: "Successfully removed member"
            });
        })
        .catch(() => {
            return res.status(500).json({ error: 'Failed to delete the member.' });
        });
};

const searchMember = async (req, res) => {
    const { propertyName, searchValue } = req.query;

    try {
        membersRef.once('value', (snapshot) => {
            const members = [];
            snapshot.forEach((childSnapshot) => {
                const member = childSnapshot.val();
                member.id = childSnapshot.key;
                members.push(member);
            });

            // Sort members based on the specified property (e.g., 'name', 'username')
            members.sort((a, b) => {
                if (a[propertyName] < b[propertyName]) return -1;
                if (a[propertyName] > b[propertyName]) return 1;
                return 0;
            });

            // Perform binary search to find the member
            const foundMember = binarySearchForMember(members, propertyName, searchValue);

            if (foundMember) {
                res.status(200).json(foundMember);
            } else {
                res.status(404).json({ error: 'Member not found.' });
            }
        });
    } catch (error) {
        return res.status(500).json({ error: 'Failed to search for members.' });
    }
};

// Binary search function
function binarySearchForMember(arr, propertyName, searchValue) {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const member = arr[mid];

        if (member[propertyName] === searchValue) {
            return member;
        } else if (member[propertyName] < searchValue) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return null; // Member not found

};


export default {
    createMember, listMembers, getMemberById, updateMember, deleteMember, searchMember
}
