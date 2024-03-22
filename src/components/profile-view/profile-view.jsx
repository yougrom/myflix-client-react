// import React, { useState, useEffect } from "react";
// import { Card, Button, Container, Row, Col, Form } from "react-bootstrap";
// import UserInfo from "./user-info";

// export const ProfileView = ({ token, user, movies, onSubmit }) => {
//   const [user, setUser] = useState(user);
// };

// useEffect(() => {
//   if (!token) {
//     console.log("Token not found.");
//     return;
//   }

//   const url = `https://dry-ridge-94435-1154c64a056a.herokuapp.com/users/${user}`;
//   fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   })
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Network response was not ok");
//       }
//       return response.json();
//     })
//     .then((userFromApi) => {
//       setUser(userFromApi);
//     })
//     .catch((error) => {
//       console.error("There was a problem with your fetch operation:", error);
//     });

//     return (
//       <Container>
//         <Row>
//           <Col>
//             <h1>Profile</h1>
//             <UserInfo email={user.Email} name={user.Username} />
//             <Form>
//               <Form.Group controlId="formBasicPassword">
//                 <Form.Label>Password</Form.Label>
//                 <Form.Control type="password" placeholder="Password" />
//               </Form.Group>
//               <Button variant="primary" type="submit" onClick={onSubmit}>
//                 Update
//               </Button>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     );
// };
