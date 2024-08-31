import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';
import MEULogo from '../assets/MEU_logo.png';

const AdminWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.color};
`;

const Logo = styled.img`
  width: 150px;
  margin-bottom: 20px;
`;

const ContentWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  padding: 30px;
  background-color: ${({ theme }) => theme.inputBackground};
  border-radius: 20px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  text-align: center;
`;

const Heading = styled.h2`
  margin-bottom: 30px;
  color: ${({ theme }) => theme.buttonBackground};
  font-family: 'Poppins', sans-serif;
  letter-spacing: 1px;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 15px;
  width: 100%;
  border-radius: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Textarea = styled.textarea`
  margin-bottom: 20px;
  padding: 15px;
  width: 100%;
  height: 150px;
  border-radius: 25px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

const Button = styled.button`
  padding: 15px 30px;
  width: 100%;
  background-color: ${({ theme }) => theme.buttonBackground};
  border: none;
  border-radius: 25px;
  color: white;
  cursor: pointer;
  font-weight: bold;
  letter-spacing: 1px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
  margin-top: 20px;

  &:hover {
    background-color: #8C2227;
    transform: translateY(-2px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.3);
  }
`;

const BackButton = styled(Button)`
  background-color: #333333;

  &:hover {
    background-color: #555555;
  }
`;

const JSONContainer = styled.div`
  margin-top: 20px;
  text-align: left;
  max-height: 300px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.inputBackground};
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
`;

function AdminPage({ toggleTheme }) {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [category, setCategory] = useState('general');
  const [jsonData, setJsonData] = useState(null); // State to hold the JSON data
  const navigate = useNavigate();

  // Fetch the JSON data from the server
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://backend-production-b84e.up.railway.app/view-questions', { withCredentials: true });
        setJsonData(response.data);
      } catch (error) {
        console.error('Error fetching JSON data:', error);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async () => {
    try {
      const data = { question, answer, category };
      await axios.post('https://backend-production-b84e.up.railway.app/admin/add', data, { withCredentials: true });
      alert('Q&A Added Successfully');
      setQuestion('');
      setAnswer('');
      setCategory('general');
    } catch (error) {
      alert('You are not authorized. Please log in.');
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  const handleDownload = () => {
    window.location.href = 'https://backend-production-b84e.up.railway.app/download-questions';
  };

  return (
    <AdminWrapper>
      <Logo src={MEULogo} alt="MEU Logo" />
      <ContentWrapper>
        <Heading>Add New Q&A</Heading>
        <Input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />
        <Input
          type="text"
          placeholder="Question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <Textarea
          placeholder="Answer"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
        <Button onClick={handleSubmit}>Submit</Button>
        <BackButton onClick={handleBackToHome}>Back to Home Page</BackButton>
        <Button onClick={handleDownload}>Download JSON File</Button>
      </ContentWrapper>

      {/* Display the JSON data */}
      {jsonData && (
        <JSONContainer>
          <h3>Current Q&A Data:</h3>
          <pre>{JSON.stringify(jsonData, null, 2)}</pre>
        </JSONContainer>
      )}

      <Button onClick={toggleTheme} style={{ marginTop: '20px' }}>
        Switch Theme
      </Button>
    </AdminWrapper>
  );
}

export default AdminPage;
