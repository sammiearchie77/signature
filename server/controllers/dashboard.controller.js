const getUserProfile = async (req, res) => {
    console.log('This is the user profile');
    console.log('Weekly Activity');
    console.log('Worked this week');
    console.log('Project worked');
    console.log('Recent activity');
    console.log('Projects');
    console.log('To Do');
};


const getUserAnalytic = async (req, res) => {
  console.log('This is the user analytic')
};

const getUserTimeSheet = async (req, res) => {
  console.log('This is the user time sheet');
};

const getUserTodo = async (req, res) => {
  console.log('This is the get user todo');
};

const getUserReport = async (req, res) => {
  console.log('This is the user report');
};

const getUserSettings = async (req, res) => {
  console.log('This is the user settings')
};


module.exports = {
  getUserProfile,
  getUserAnalytic,
  getUserTimeSheet,
  getUserTodo,
  getUserReport,
  getUserSettings
};
