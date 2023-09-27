const binarySearch = (arr, target) => {
    let left = 0;
    let right = arr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);
        const user = arr[mid];

        if (user.username === target) {
            return user; // User found
        }

        if (user.username < target) {
            left = mid + 1;
        } else {
            right = mid - 1;
        }
    }

    return null; // User not found
};

module.exports = binarySearch;