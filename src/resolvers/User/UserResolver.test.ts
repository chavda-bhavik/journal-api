import { gCall } from "../../test-util/gCall";
import { testConn } from "../../test-util/testConn"
import { Connection } from "typeorm";
import faker from 'faker'

let conn:Connection;
beforeAll( async () => {
    conn = await testConn();
});
afterAll( async () => {
    await conn.close();
});

const usersQuery = `
mutation register($email: String!, $password: String!, $username: String!) {
    registerUser(
        email:$email,
        password:$password,
        username:$username
    ) {
        id
        username
        email
        mobileNo
        avatar
    }
}
`

describe('user operation', () => {
    it("should register an user", async () => {
        const user = {
            email: faker.internet.email(),
            password: faker.internet.password(),
            username: faker.name.findName()
        }
        let response = await gCall({
            source: usersQuery,
            variableValues: user
        });
        expect(response).toMatchObject({
            data: {
                registerUser: {
                    email: user.email,
                    username: user.username
                }
            }
        });
    })
})