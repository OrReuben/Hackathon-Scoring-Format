export const host = "http://localhost:5000"
export const userRoutes = `${host}/user`
export const scoreRoutes = `${host}/scores`
export const loginRoute = `${userRoutes}/login`
export const getScores = `${scoreRoutes}`
export const deleteScores = `${scoreRoutes}/reset`
export const updateScores = `${scoreRoutes}/update-scores`