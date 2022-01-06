import React, {
  useState,
  useContext,
  createContext,
  ReactNode,
  useEffect,
} from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  User,
  UserCredential,
} from "firebase/auth";
import { Container, Spinner, Row } from "react-bootstrap";

interface AuthContextType {
  currentUser?: User;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  login: (email: string, password: string) => Promise<UserCredential>;
  loginWithGoogle: () => Promise<UserCredential>;
  logOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [currentUser, setCurrentUser] = useState<User>();
  const [loading, setLoading] = useState(true);

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  const loginWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  const value = {
    currentUser,
    signUp,
    login,
    loginWithGoogle,
    logOut,
  };

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      if (user) {
        setCurrentUser(user);
      }
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider value={value}>
      {loading ? (
        <Container className="d-flex vh-100">
          <Row className="m-auto align-self-center">
            <Spinner animation="border" />
          </Row>
        </Container>
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
