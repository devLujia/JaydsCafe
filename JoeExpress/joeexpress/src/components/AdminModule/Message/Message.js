import React, { useEffect, useState, useRef } from 'react'
import user from '../../image/UserAcc.svg'
import notif from '../../image/notif.svg'
import jaydsLogo from '../../image/jayds cafe Logo.svg';
import send from '../../image/send.svg'
import { Link, useNavigate } from 'react-router-dom';
import Profile from '../../Profile/Profile';
import axios from 'axios';
import socket from './socketService';
import { BsEnvelopePaperFill  } from "react-icons/bs";
import { RiDeleteBin6Fill } from "react-icons/ri";
import { FaEllipsisVertical } from "react-icons/fa6";

export default function Message() {

   const [authenticated, setAuthenticated] = useState(false);
   const [userId, setUserId] = useState(null);
   const [profile, setProfile] = useState([]);
   const [role, setRole] = useState([]);
   const [currentMessage, setCurrentMessage] = useState('');
   const [messageList, setMessageList] = useState([]);
   const [isOpen, setIsOpen] = useState(false);
   const navigate = useNavigate();
   const [ticketId, setTicketId] = useState([]);
   const [specificTicketId, setSpecificTicketId] = useState('');
   const [messages, setMessages] = useState([]);
   const [earliestMessageTimestamp, setEarliestMessageTimestamp] = useState(null);
   const [hasMore, setHasMore] = useState(true); // To check if more messages are available
   const [loading, setLoading] = useState(false); // Loading state for backread
   const [update, setUpdate] = useState(false);
   const [emails, setEmails] = useState([]);
   const [error, setError] = useState(null);

   const [selectedEmail, setSelectedEmail] = useState(null);
   const [selectedUser, setSelectedUser] = useState(null);
   const [messageBody, setMessageBody] = useState("");
   const [replyBody, setReplyBody] = useState("");
   const [messageDate, setMessageDate] = useState('');
   const [subject, setSubject] = useState('');

   const [tier1,setTier1] = useState([])
   const [tier2,setTier2] = useState([])
   const [tier3,setTier3] = useState([])
   const [tier,setTier] = useState([])
   const [cmsName,setCmsName] = useState('');

    useEffect(()=>{
        axios.post('http://localhost:8081/roleSetup')
        .then(response=>{
            setTier(response.data)
        })
        .catch(error => {
            console.error('Error fetching food details:', error);
        });
    },[])

    useEffect(() => {
      const fetchEmails = async () => {
        try {
          const response = await axios.get('http://localhost:8081/emails');
          setEmails(response.data);
        } catch (err) {
          setError('Error fetching emails');
        } finally {
          setLoading(false);
        }
      };
  
      fetchEmails();
    }, []);

    useEffect(() => {
      const fetchNameData = async () => {
          try {
              const response = await axios.post('http://localhost:8081/cms', { title: 'Business Name' });
              setCmsName(response.data.content || '');
          } catch (error) {
              console.error('Error fetching data:', error);
          }
      };
  
      fetchNameData();
  }, []);

    useEffect(() => {

        setTier3([]);
        setTier2([]);
        setTier1([]);

        tier.forEach(tiers => {
        if (tiers.administer === 3) {
            setTier3(prev => [...prev, tiers.title]);
        } else if (tiers.administer === 2) {
            setTier2(prev => [...prev, tiers.title]);
        } else {
            setTier1(prev => [...prev, tiers.title]);
        }
        });

    }, [tier]);

   axios.defaults.withCredentials = true;

   useEffect(() => {
      const getTicketNumber = async () => {
        try {
          const response = await axios.post('http://localhost:8081/getTicketId');
          setTicketId(response.data); 
          
        } 
        catch (error) {
          console.error('Error fetching ticket ID:', error);
        }
   
      };
    
      getTicketNumber();
    }, [update,messageList]);

      const fetchMessages = async (ticket) => {

         if (specificTicketId) {
            socket.emit('leave_Room', specificTicketId);
            socket.off('receive_message');
            setMessageList([]);
            setCurrentMessage('');
          }

         if (ticket) { 
            try {
            setSpecificTicketId(ticket)

            const response = await axios.post('http://localhost:8081/getMessages',  {ticketId: ticket} );

            setMessages(response.data);
            socket.emit('join_room', ticket);
            
            } 
            catch (error) {
            console.error('Error fetching messages:', error);
            }
         }

      };


      const loadMoreMessages = () => {
         if (!loading && hasMore) {
           setLoading(true);
           fetchMessages(specificTicketId);
           setLoading(false);
         }
       };
     
       const handleScroll = (e) => {
         if (e.target.scrollTop === 0 && hasMore && !loading) {
           loadMoreMessages();
         }
       };

       const handleSendMessage = async (body) => {
         // Regular expression to extract email from the body
         const emailRegex = /([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/;
     
         const match = body.match(emailRegex);
     
         let extractedEmail = '';
         if (match && match[0]) {
             extractedEmail = match[0]; // The email is the first match
             console.log('Extracted Email:', extractedEmail);
         } else {
             console.log('No email found');
             return; // Stop execution if no email is found
         }
     
         try {
             // Prepare the data to be sent, using the extracted email as the recipient
             const messageData = {
                 recipient: extractedEmail, // Use the extracted email as the recipient
                 subject: subject,  // You can modify this to change subject if needed
                 body: replyBody,  // Message body from textarea
             };
     
             // Sending the message via an API (you can replace the URL with your actual API endpoint)
             const response = await axios.post('http://localhost:8081/sendMessage', messageData);
     
             if (response.status === 200) { 
                 setIsMessageOpen(false);
                 setReplyBody('');
                 alert('Message sent successfully!');
             } else {
                 alert('Failed to send message. Please try again.');
             }
         } catch (error) {
             console.error('Error sending message:', error);
             alert('An error occurred while sending the message.');
         }
     };


      useEffect(() => {
         if (specificTicketId) {
           fetchMessages(specificTicketId);
         }
       }, [specificTicketId]);   

       useEffect(() => {
         const fetchProfileData = async () => {
             try {
                 const response = await axios.post('http://localhost:8081/profile', { userId });
                 setProfile(response.data);
             } catch (error) {
                 console.error('Error fetching profile details:', error);
             }
         };
     
         if (userId) {
             fetchProfileData();
         }
     }, [userId]);

   useEffect(() => {
      const fetchData = async () => {
      try {
         const res = await axios.get('http://localhost:8081/admin');
         if (res.data.valid) {
            setAuthenticated(true);
            setUserId(res.data.userId);
            setRole(res.data.role);
         } 
         
         else {
         navigate('/admin');
         }
      } 
      
      
      catch (err) {
         console.log(err);
      }
      };

      fetchData();
      }, [navigate]);
   
      useEffect(() => {
         // Listen for incoming messages from the server
         socket.on('receive_message', (messageData) => {
            
            if(messageData.userId !== userId){
               setMessageList((prevChat) => [...prevChat, messageData]);
            }
         });
       
         // Cleanup the socket listener when the component unmounts
         return () => {
           socket.off('receive_message');
         };
       }, [userId]);

   const sendMessage = async (e) => {
      if (currentMessage.trim() !== '') {
         e.preventDefault();
  
        const messageData = {
            author: profile?.name,
            role : "Admin",
            room : specificTicketId,
            userId: userId,
            message: currentMessage,
            time: new Date(Date.now()).toLocaleTimeString([], {
               hour: '2-digit',
               minute: '2-digit',
             }),
        }
  
        // Emit message to the server
        await socket.emit('send_message', messageData);
        setMessageList((prevChat) => [...prevChat,  messageData ]);
        setCurrentMessage('');
      }
   };

      const handleKeyDown = async (e) => {
         if (e.key === 'Enter' && currentMessage.trim() !== '') {
            e.preventDefault();
  
            const messageData = {
               author: profile?.name,
               role : "Admin",
               room : specificTicketId,
               userId: userId,
               message: currentMessage,
               time:
               new Date(Date.now()).getHours()+
               ":" +
               new Date(Date.now()).getMinutes(),
            }
      
            // Emit message to the server
            await socket.emit('send_message', messageData);
            setMessageList((prevChat) => [...prevChat,  messageData ]);
            setCurrentMessage('');
         }
     };

   
    //for dropdown user
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
  };

  const handleLogout = async () => {
      try {
      const res = await axios.post('http://localhost:8081/logout');
      if (res.data.success) {
          // eslint-disable-next-line no-restricted-globals
          location.reload();
          navigate('/');
      } else {
          console.log('Logout Failed');
      }
      } catch (error) {
      console.error('Error during logout:', error);
      }
  };
  
  const closeTicket = async (status, ticket) => {
   try {
       const res = await axios.post('http://localhost:8081/closeTicket', {
           status: status,
           ticketId: ticket
       });

       alert(res.data.status);  // Show the status message from the response

       // Update the state if the request is successful
       setUpdate(res.data.success);
   } catch (err) {
       console.error('Error closing the ticket:', err);
       alert('There was an error closing the ticket. Please try again.');
   }
};

      //for autoscroll
      const chatboxRef = useRef(null);

      useEffect(() => {
         // Scroll to the bottom whenever messageList updates
         if (chatboxRef.current) {
            chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
         }
      }, [messageList]);


      //for modal in contact modal

      

      const [isMessageOpen, setIsMessageOpen] = useState(false);
   
      const handleRowClick = (from, subject, body, date) => {
         setSelectedEmail(from);  // Store sender name
         setSubject(subject);     // Store subject
         setMessageBody(body);    // Store email body
         setMessageDate(date);    // Store email date
         setIsMessageOpen(true);  // Open the modal
     };
   
      const closeModal = () => {
         setIsMessageOpen(false);
      };
      
      function stripHtmlTags(html) {
         const doc = new DOMParser().parseFromString(html, 'text/html');
         return doc.body.textContent || "";
       }

  return (
    <div class="bg-jaydsBg h-full">
         {/* <!-- nav --> */}
         <nav class="sticky top-0 bg-jaydsBg z-20 shadow-lg flex justify-between dark:bg-[#282828]">
               <div class="font-extrabold text-2xl flex items-center">
                  {/* <!-- Logo/Title in Navbar --> */}
                  <a href="index.html" class="flex items-center text-greenColor ms-5 text-3xl tracking-wide">{stripHtmlTags(cmsName)}</a>
               </div>
               <div></div>
               {/* <!-- Button for Login or Sign Up --> */}
               <div class="flex justify-end items-center">
                  <button className='rounded-full p-2 bg-white border border-gray-400'>
                     <img src={notif}></img>
                  </button>
                  <div class="px-4 py-3 text-sm text-gray-900 flex flex-col items-center justify-end dark:text-white">
                     <div class="font-bold">{profile.name}</div>
                     <div class="items-center justify-center">{(profile?.role?.toUpperCase() || '')}</div>
                  </div>

                  
                  <button onClick={toggleDropdown}>
                     <img id="avatarButton" type="button" class="w-10 h-10 rounded-full cursor-pointer" src={user} alt="User dropdown"/>
                  </button>

                  {isOpen && (
                  <div className="absolute top-5 right-10 mt-8 w-48 bg-white border rounded-lg shadow-lg z-50">
                     <ul className="py-2">
                           <li onClick={()=>navigate('/settings')} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                           Profile
                           </li>
                           <li
                           className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                           onClick={handleLogout}
                           >
                           Logout
                           </li>
                     </ul>
                  </div>
                  )}

               </div>
         </nav>
        
         <div class="bg-white h-screen flex justify-center items-center sm:hidden z-10">
          <p class="text-black text-xl">Only for desktop use!</p>
         </div>

         <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-72 h-screen pt-5 transition-transform -translate-x-full bg-white border-r border-white dark:border-gray-600 sm:translate-x-0 dark:bg-[#282828]" aria-label="Sidebar">
            <div class="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-[#282828]">
               <a href="#" class="flex items-center ps-2.5 mb-5">
                  <img src={jaydsLogo} alt="Logo"/>           
                  <span 
                     className="self-center text-2xl font-extrabold tracking-wider whitespace-nowrap text-greenColor ms-2" 
                     dangerouslySetInnerHTML={{ __html: cmsName || "Business name"  }}>
                  </span>
               </a>
               <ul class="space-y-2 font-medium ">



               {tier3.includes(profile?.role || '')?
               
               <li> {/* <!-- Dashboard --> */}
                  <Link to="/dashboard">
                        <a href="#" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                           <svg class="w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 21">
                           <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z"/>
                           <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z"/>
                           </svg>
                           <span class="ms-3">Dashboard</span>
                        </a>
                  </Link>
               </li> : 
               ''}

                  {tier3.includes(profile?.role || '') || tier2.includes(profile?.role || '') ?
                     
                     <React.Fragment>
                     
                  <li> {/* <!-- Order Management --> */}
                     <a href="/Order" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 21">
                           <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z"/>
                        </svg>
                        <span class="ms-3">Order</span>
                     </a>
                  </li>

                  <li> {/* <!-- Product Management --> */}        
                     <a href="/ProductManagement" class="flex items-center p-2 text-gray-600 rounded-lg  hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 20">
                           <path d="M17 5.923A1 1 0 0 0 16 5h-3V4a4 4 0 1 0-8 0v1H2a1 1 0 0 0-1 .923L.086 17.846A2 2 0 0 0 2.08 20h13.84a2 2 0 0 0 1.994-2.153L17 5.923ZM7 9a1 1 0 0 1-2 0V7h2v2Zm0-5a2 2 0 1 1 4 0v1H7V4Zm6 5a1 1 0 1 1-2 0V7h2v2Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Product</span>
                     </a>         
                  </li>
                  </React.Fragment>
                  :''}

                  {tier3.includes(profile?.role || '')|| tier2.includes(profile?.role || '') ?
                  <><li> {/* <!-- Sales Report --> */}
                  <a href="/Sales" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                     <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 dark:text-white group-hover:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z"/>
                        <path d="M6.737 11.061a2.961 2.961 0 0 1 .81-1.515l6.117-6.116A4.839 4.839 0 0 1 16 2.141V2a1.97 1.97 0 0 0-1.933-2H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18v-3.093l-1.546 1.546c-.413.413-.94.695-1.513.81l-3.4.679a2.947 2.947 0 0 1-1.85-.227 2.96 2.96 0 0 1-1.635-3.257l.681-3.397Z"/>
                        <path d="M8.961 16a.93.93 0 0 0 .189-.019l3.4-.679a.961.961 0 0 0 .49-.263l6.118-6.117a2.884 2.884 0 0 0-4.079-4.078l-6.117 6.117a.96.96 0 0 0-.263.491l-.679 3.4A.961.961 0 0 0 8.961 16Zm7.477-9.8a.958.958 0 0 1 .68-.281.961.961 0 0 1 .682 1.644l-.315.315-1.36-1.36.313-.318Zm-5.911 5.911 4.236-4.236 1.359 1.359-4.236 4.237-1.7.339.341-1.699Z"/>
                     </svg>
                     <span class="flex-1 ms-3 whitespace-nowrap">Sales Report</span>
                  </a>
                  </li>

                  <li> {/* <!-- Customer Account --> */}
                     <a href="/CustomerAccount" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 18">
                           <path d="M14 2a3.963 3.963 0 0 0-1.4.267 6.439 6.439 0 0 1-1.331 6.638A4 4 0 1 0 14 2Zm1 9h-1.264A6.957 6.957 0 0 1 15 15v2a2.97 2.97 0 0 1-.184 1H19a1 1 0 0 0 1-1v-1a5.006 5.006 0 0 0-5-5ZM6.5 9a4.5 4.5 0 1 0 0-9 4.5 4.5 0 0 0 0 9ZM8 10H5a5.006 5.006 0 0 0-5 5v2a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-2a5.006 5.006 0 0 0-5-5Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Admin Account</span>
                     </a>
                  </li>

                  <li> {/* <!-- Content Management --> */}
                     <a href="/ContentManagement" class="flex items-center p-2 text-gray-600 rounded-lg hover:bg-greenColor group hover:text-white dark:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75 group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 18">
                           <path d="M6.143 0H1.857A1.857 1.857 0 0 0 0 1.857v4.286C0 7.169.831 8 1.857 8h4.286A1.857 1.857 0 0 0 8 6.143V1.857A1.857 1.857 0 0 0 6.143 0Zm10 0h-4.286A1.857 1.857 0 0 0 10 1.857v4.286C10 7.169 10.831 8 11.857 8h4.286A1.857 1.857 0 0 0 18 6.143V1.857A1.857 1.857 0 0 0 16.143 0Zm-10 10H1.857A1.857 1.857 0 0 0 0 11.857v4.286C0 17.169.831 18 1.857 18h4.286A1.857 1.857 0 0 0 8 16.143v-4.286A1.857 1.857 0 0 0 6.143 10Zm10 0h-4.286A1.857 1.857 0 0 0 10 11.857v4.286c0 1.026.831 1.857 1.857 1.857h4.286A1.857 1.857 0 0 0 18 16.143v-4.286A1.857 1.857 0 0 0 16.143 10Z"/>
                        </svg>
                        <span class="flex-1 ms-3 whitespace-nowrap">Content Management</span>
                     </a>
                  </li></>
                  :
                  ''}

                  

               </ul>
      
               <ul class="pt-5 mt-10 space-y-2 font-medium border-t border-gray-200 dark:border-gray-700">

               {tier3.includes(profile?.role || '') || tier2.includes(profile?.role || '') || tier1.includes(profile?.role || '')? <li> {/* <!-- Inbox --> */}
                     <a href="#" class="flex items-center p-2 rounded-lg bg-greenColor group text-white">
                           <svg class="flex-shrink-0 w-5 h-5 transition duration-75 text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                              <path d="m17.418 3.623-.018-.008a6.713 6.713 0 0 0-2.4-.569V2h1a1 1 0 1 0 0-2h-2a1 1 0 0 0-1 1v2H9.89A6.977 6.977 0 0 1 12 8v5h-2V8A5 5 0 1 0 0 8v6a1 1 0 0 0 1 1h8v4a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-4h6a1 1 0 0 0 1-1V8a5 5 0 0 0-2.582-4.377ZM6 12H4a1 1 0 0 1 0-2h2a1 1 0 0 1 0 2Z"/>
                           </svg>
                           <span class="flex-1 ms-3 whitespace-nowrap">Inbox</span>
                           <span class="inline-flex items-center justify-center w-3 h-3 p-3 ms-3 text-sm font-medium text-blue-800 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300">3</span>
                     </a>
                  </li> : ''}
                  <li> {/* <!-- Settings --> */}
                     <a href="/Settings" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                        <svg class="flex-shrink-0 w-7 h-7 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                           <path fill-rule="evenodd" d="M17 10v1.126c.367.095.714.24 1.032.428l.796-.797 1.415 1.415-.797.796c.188.318.333.665.428 1.032H21v2h-1.126c-.095.367-.24.714-.428 1.032l.797.796-1.415 1.415-.796-.797a3.979 3.979 0 0 1-1.032.428V20h-2v-1.126a3.977 3.977 0 0 1-1.032-.428l-.796.797-1.415-1.415.797-.796A3.975 3.975 0 0 1 12.126 16H11v-2h1.126c.095-.367.24-.714.428-1.032l-.797-.796 1.415-1.415.796.797A3.977 3.977 0 0 1 15 11.126V10h2Zm.406 3.578.016.016c.354.358.574.85.578 1.392v.028a2 2 0 0 1-3.409 1.406l-.01-.012a2 2 0 0 1 2.826-2.83ZM5 8a4 4 0 1 1 7.938.703 7.029 7.029 0 0 0-3.235 3.235A4 4 0 0 1 5 8Zm4.29 5H7a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h6.101A6.979 6.979 0 0 1 9 15c0-.695.101-1.366.29-2Z" clip-rule="evenodd"/>
                        </svg>
                        <span class="ms-1">Settings</span>
                     </a>
                  </li>

                  <li onClick={handleLogout}> {/* <!-- Sign Out --> */}
                     <a href="#" class="flex items-center p-2 text-gray-600 transition duration-75 rounded-lg hover:bg-greenColor dark:text-white group hover:text-white">
                        <svg class="flex-shrink-0 w-5 h-5 text-gray-600 transition duration-75  group-hover:text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 16">
                           <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 8h11m0 0L8 4m4 4-4 4m4-11h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-3"/>
                        </svg>
                        <span class="ms-3">Sign Out</span>
                     </a>
                  </li>
               </ul>
            <h1 class="text-md font-semibold text-gray-500 fixed bottom-5 dark:text-white">Copyright © 2024 • uixLujiaa • MigzGo • Chard C. • Dale Gab</h1>
            </div>
         </aside>

         <div className="p-4 sm:ml-64 md:pl-14 py-2 mb-0 hidden sm:block h-[600px]">
            {/* This is chat */}
            <div className="container mx-auto shadow-lg rounded-lg h-[500px]">
            {/* Header */}
            <div className="top-0 sticky px-5 py-3 flex justify-between items-center bg-white border-b-2 rounded-t-xl dark:bg-gray-900 dark:text-white">
               <div className="font-semibold text-2xl">Active Conversation</div>
               <div className="flex flex-row">
                  <div className="text-center me-1">
                  <h1 className="font-semibold">{profile.name}</h1>
                  <span className="text-sm">{profile.role}</span>
                  </div>
                  <div className="h-12 w-12 p-2 bg-greenColor rounded-full text-white font-semibold flex items-center justify-center">
                  <h1>{profile?.name?.charAt(0).toUpperCase() || ''}</h1>
                  </div>
               </div>
            </div>

            {/* Chatting */}
            <div className="flex flex-row justify-between bg-white overflow-hidden dark:bg-gray-800 h-full">
               {/* Chat list */}
               <div className="flex flex-col w-2/5 border-r-2 h-full">
                  {/* Search component */}
                  <div className="border-b-2 py-4 px-2 top-0 sticky">
                  <input
                     type="text"
                     placeholder="Search"
                     className="py-2 px-2 border-2 border-gray-200 rounded-2xl w-full dark:bg-gray-800"
                  />
                  </div>
                  {/* User list */}
                  <div className="overflow-y-auto flex-grow">
                  {ticketId.map((ticket) => (
                     <div key={ticket.ticket_id} className="flex flex-row py-3 px-3 justify-center hover:bg-gray-200">
                        <div className="w-full flex" onClick={() => fetchMessages(ticket?.ticket_id || '')}>
                        <div className="w-1/4">
                           <img
                              src={user} // Ensure 'user' is a valid image source
                              className="object-cover h-12 w-12 rounded-full"
                              alt=""
                           />
                        </div>
                        <div className="w-full px-2">
                           <div className="text-sm tracking-wider dark:text-white hover:text-gray-900">
                              Ticket Id : <span className='text-base hover:text-gray-900'>{ticket?.ticket_id}</span>
                           </div>
                           <div className="text-sm tracking-wider dark:text-white hover:text-gray-500">
                              From : <span className='text-base hover:text-gray-900'>{ticket?.name}</span>
                           </div>
                           <span className="text-gray-500 text-sm">Subject : <span className='text-base hover:text-gray-900'>{ticket?.subject || "No Subject Yet"}</span></span>
                           
                        </div>
                        
                        </div>

                        <button 
                           onClick={() => closeTicket(ticket.status === "open" ? "closed" : "open", ticket.ticket_id)} 
                           className="flex items-center text-sm px-2 text-white justify-center border-2 border-gray-200 bg-textgreenColor rounded-2xl dark:text-white hover:text-gray-900"
                           >
                           <span className="whitespace-nowrap">
                              {ticket.status === "open" ? "Closed" : "Open"} Ticket
                           </span>
                        </button>                 
                        </div>
                  ))}
                  </div>
               </div>

               {/* Message area */}
               <div className="w-full px-5 flex flex-col justify-between h-full">
                  <div className="flex flex-col mt-2 overflow-y-auto h-[calc(100%-60px)]" id="chatbox" ref={chatboxRef}>
                     {/* Message map */}
                     <div onScroll={handleScroll} className="chat-window">

                     {messages.map((messageContent) => (
                    <div
                      key={messageContent?.id}
                      className={`mb-2 flex ${messageContent?.sender_id === userId ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="max-w-[80%] sm:max-w-[70%] overflow-hidden">
                        {/* Message Content */}
                        <p
                          className={`${
                            messageContent?.sender_id === userId ? 'bg-blue-500' : 'bg-green-700'
                          } text-white rounded-lg py-2 px-4 text-sm shadow-md relative break-words`}
                          style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
                        >
                          {/* Conditionally render sender's name */}
                          {messageContent?.sender_id !== userId
                            ? `${messageContent?.name}: ${messageContent.content}`
                            : messageContent?.content}
                        </p>

                        {/* Time at the bottom */}
                        <p className="text-xs text-gray-500 mt-1 text-left">
                          {new Date(messageContent?.created_at).toLocaleTimeString([], {
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </p>
                      </div>
                    </div>
                  ))}
                        {loading && <p>Loading more messages...</p>}

                     </div>

                     {messageList.map((messageContent, index) => (
                        <div
                          key={index}
                          className={`my-3 flex ${messageContent.userId === userId ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className="max-w-[80%] sm:max-w-[70%] overflow-hidden">
                            
                            <p
                              className={`${
                                messageContent.userId === userId ? 'bg-blue-500 text-left' : 'bg-green-700 text-right'
                              } text-white rounded-lg py-3 px-4 text-sm shadow-md relative break-words`}
                              style={{ wordWrap: 'break-word', whiteSpace: 'normal' }}
                            >
                              
                              {messageContent.role === 'Admin'
                                ? `${messageContent.message}`
                                : `${messageContent.author}: ${messageContent.message}`}
                            </p>

                            <p className="text-xs text-gray-600 mt-1 text-right">
                              {messageContent.time}
                            </p>

                          </div>
                        </div>
                      ))}

                  </div>

                  {/* Message input */}
                  <label htmlFor="search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Type Something here.</label>
                  <div className="relative bottom-0 fixed w-full">
                  <input
                     type="text"
                     value={currentMessage}
                     onChange={(e) => setCurrentMessage(e.target.value)}
                     onKeyDown={handleKeyDown}
                     placeholder="Type a message"
                     id="search"
                     className="mb-2 block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  />
                  <button
                     onClick={sendMessage}
                     className="text-white absolute end-2.5 bottom-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                     <img src={send} alt="send icon" />
                  </button>
                  </div>
               </div>
            </div>
            </div>

         </div>
         
         <div class="flex flex-col p-4 sm:ml-64 md:pl-14 py-2 ">
            <div class=" overflow-x-auto pb-4 h-[500px]">
               <div class="min-w-full inline-block align-middle">
                  <div class="overflow-hidden  border rounded-lg border-gray-300">
                     <table class="table-auto min-w-full rounded-xl">
                        <thead className='border-b-2 sticky top-0 z-10'>
                           <tr class="bg-gray-50 Capitalize font-semibold">
                              <th scope="col"></th>
                              <th scope="col" class="p-5 text-left whitespace-nowrap text-xl leading-6 text-gray-900 min-w-[150px]"> Contact us message </th>
                              <th scope="col"></th>
                              <th scope="col"></th>
                           </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-300 relative">
                        {emails.map((email,index) => (
                        <tr
                           key={index}
                           className="bg-white transition-all duration-500 hover:bg-gray-200 cursor-pointer group relative"
                           onClick={() => handleRowClick(email.from.split("<")[0].trim(), email.subject, email.body, email.date)}
                        >
                           <td>
                              <span className="flex w-3 h-3 me-3 bg-red-500 rounded-full absolute left-2 top-1/2 transform -translate-y-1/2 z-10"></span>
                           </td>
                           <td className="px-5 py-3">
                              <div className="w-48 flex items-center gap-3 ps-2">
                              
                              <div className="data">
                                 <p className="font-semibold text-sm text-gray-900">{email.from.split("<")[0].trim()}</p>
                                 <p className="font-normal text-xs leading-5 text-gray-400">{email.from.match(/<(.+)>/)?.[1]}</p>
                              </div>
                              </div>
                           </td>
                           <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                              <div className="flex">
                              <h1 className="font-semibold text-md">{email.subject}</h1>
                              <span className="font-semibold mx-2">-</span>
                              <p className="text-gray-400 text-[13px]">{email.body && email.body.length > 0 ? email.body.substring(0, 50) + "..." : "No message"}...</p>
                              </div>
                           </td>
                           <td className="p-5 whitespace-nowrap text-sm leading-6 font-medium text-gray-900">
                              <div className="flex items-center justify-end relative">
                              <span className="text-gray-500 text-sm absolute right-5 top-1/2 transform -translate-y-1/2 group-hover:hidden">
                                 <span className="text-gray-400 text-[10px] me-2">{new Date(email.date).toLocaleDateString()}</span>
                                 {new Date(email.date).toLocaleTimeString()}
                              </span>

                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 absolute right-5 top-1/2 transform -translate-y-1/2">
                                 {/* <button className="rounded-lg transition-all duration-500 hover:bg-gray-400 flex items-center justify-center w-8 h-8 hover:text-white" title="Mark as read">
                                    <BsEnvelopePaperFill />
                                 </button>
                                 <button className="rounded-lg transition-all duration-500 hover:bg-gray-400 flex items-center justify-center w-8 h-8 hover:text-white" title="Delete">
                                    <RiDeleteBin6Fill />
                                 </button>
                                 <button className="rounded-lg transition-all duration-500 hover:bg-gray-400 flex items-center justify-center w-8 h-8 hover:text-white" title="">
                                    <FaEllipsisVertical />
                                 </button> */}
                              </div>
                              </div>
                           </td>
                        </tr>
                        ))}
                     </tbody>

                     {isMessageOpen && (
                           <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex justify-center items-center z-50">
                              <div className="bg-white rounded-lg shadow-xl max-w-3xl w-full p-6 relative">
                                    <div className="flex justify-between items-center pb-2 border-b-2 border-gray-200">
                                       <h4 className="text-lg text-gray-900 font-bold">Message to {selectedEmail}</h4>
                                       <button className="block cursor-pointer" onClick={() => setIsMessageOpen(false)}>
                                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.75732 7.75739L16.2426 16.2427M16.2426 7.75739L7.75732 16.2427" stroke="black" stroke-width="1.6" stroke-linecap="round"></path>
                                          </svg>
                                       </button>
                                    </div>
                                    <div className="my-4">
                                       <label className="text-neutral-500 dark:text-neutral-400">Recipient:</label>
                                       <input
                                          type="text"
                                          className="relative m-0 mb-4 -me-0.5 block w-full flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out"
                                          id="recipient-name"
                                          value={selectedEmail}
                                          disabled
                                       />

                                       <label className="text-neutral-500 dark:text-neutral-400">Subject:</label>
                                       <input
                                          type="text"
                                          className="relative m-0 mb-4 -me-0.5 block w-full flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-3 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out"
                                          id="email-subject"
                                          value={subject}
                                          disabled
                                       />

                                       <div className="border border-gray-300 rounded-md p-3 min-h-72 max-h-80 overflow-y-scroll mb-4">
                                          <p>{messageBody}</p>
                                       </div>

                                       <label className="text-neutral-500 dark:text-neutral-400">Reply:</label>
                                       <textarea
                                          className="relative m-0 min-h-20 max-h-96 -me-0.5 block w-full flex-auto rounded border border-solid border-neutral-300 bg-transparent bg-clip-padding px-2 py-[0.25rem] text-base font-normal leading-[1.6] text-neutral-700 outline-none transition duration-200 ease-in-out"
                                          id="message-text"
                                          placeholder="Message here"
                                          value={replyBody}
                                          onChange={(e)=>setReplyBody(e.target.value)}
                                          
                                       />
                                    </div>
                                    <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-gray-200 p-4 pb-0 pr-0 dark:border-white/10">
                                       <button
                                          type="button"
                                          className="inline-block rounded-md bg-gray-200 px-6 py-2 text-xs font-semibold uppercase text-gray-700 transition duration-200 ease-in-out hover:bg-gray-300 focus:bg-gray-300 focus:outline-none active:bg-gray-400 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:focus:bg-gray-700 dark:active:bg-gray-800"
                                          onClick={() => setIsMessageOpen(false)} // Close modal
                                       >
                                          Close
                                       </button>

                                       <button
                                          type="button"
                                          className="ms-2 inline-block rounded-md bg-indigo-600 px-6 py-2 text-xs font-semibold uppercase text-white shadow-lg shadow-indigo-500/30 transition duration-200 ease-in-out hover:bg-indigo-700"
                                          onClick={() => handleSendMessage(messageBody)}
                                       >
                                          Send Message
                                       </button>
                                    </div>
                              </div>
                           </div>
                     )}

                     </table>
                  </div>
               </div>
            </div>
         </div>
         
    </div>
  )
}