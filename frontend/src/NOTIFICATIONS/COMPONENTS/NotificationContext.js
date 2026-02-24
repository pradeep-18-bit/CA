


// import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

// const NotificationContext = createContext();

// export const NotificationProvider = ({ children }) => {
//   const [notifications, setNotifications] = useState([]);
//   const email = localStorage.getItem("email");

//   /* ================= LOAD RECENT ================= */
//   useEffect(() => {
//     if (!email) return;

//     fetch(
//       `https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications/recent?email=${email}`,
//       { headers: { "ngrok-skip-browser-warning": "true" } }
//     )
//       .then(res => res.json())
//       .then(data => {
//         const list = Array.isArray(data) ? data : data?.data || [];
//         setNotifications(list);
//       })
//       .catch(() => setNotifications([]));
//   }, [email]);

//   /* ================= SSE LISTENER ================= */
//   useEffect(() => {
//     if (!email) return;

//     const es = new EventSource(
//       `https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications/sse?email=${email}`
//     );

//     es.onmessage = (event) => {
//       let payload;
//       try {
//         payload = JSON.parse(event.data);
//       } catch {
//         payload = { message: event.data };
//       }

//       setNotifications(prev => {
//         // 🔒 DEDUPLICATE
//         const exists = prev.some(
//           n =>
//             n.message === payload.message &&
//             n.taskId === payload.taskId
//         );

//         if (exists) return prev;

//         return [
//           {
//             message: payload.message,
//             taskId: payload.taskId,
//             type: payload.type,
//             isRead: false,
//             createdAt: new Date().toISOString(),
//           },
//           ...prev,
//         ];
//       });
//     };

//     es.onerror = () => es.close();
//     return () => es.close();
//   }, [email]);

//   /* ================= DERIVED COUNT (🔥 FIX) ================= */
//   const unreadCount = useMemo(
//     () => notifications.filter(n => !n.isRead).length,
//     [notifications]
//   );

//   /* ================= MARK ALL READ ================= */

//    const markAllRead = async () => {
//   if (!email) return;

//   try {
//     await fetch(
//       "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications/mark-all-read",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           "ngrok-skip-browser-warning": "true",
//         },
//         body: JSON.stringify({ email }),
//       }
//     );

//     // ✅ update frontend AFTER backend success
//     setNotifications(prev =>
//       prev.map(n => ({ ...n, isRead: true }))
//     );
//   } catch (err) {
//     console.error("Mark all read failed", err);
//   }
// };



//   return (
//     <NotificationContext.Provider
//       value={{ notifications, unreadCount, markAllRead }}
//     >
//       {children}
//     </NotificationContext.Provider>
//   );
// };

// export const useNotifications = () => useContext(NotificationContext);












import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);
  const email = localStorage.getItem("email");

  /* ================= LOAD RECENT ================= */
  useEffect(() => {
    if (!email) return;

    fetch(
      `https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications/recent?email=${email}`,
      { headers: { "ngrok-skip-browser-warning": "true" } }
    )
      .then(res => res.json())
      .then(data => {
        const list = Array.isArray(data) ? data : [];

        // 🔥 MAP BACKEND FORMAT → FRONTEND FORMAT
        const formatted = list.map(item => ({
          id: item.id,
          message: item.text,   // ← FIX HERE
          createdAt: item.createdAt,
          isRead: false,
        }));

        setNotifications(formatted);
      })
      .catch(() => setNotifications([]));
  }, [email]);

  /* ================= SSE LISTENER ================= */
  useEffect(() => {
    if (!email) return;

    const es = new EventSource(
      `https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications/sse?email=${email}`
    );

    es.onmessage = (event) => {
      const message = event.data;

      setNotifications(prev => {
        // 🔒 DEDUPLICATE BY MESSAGE
        const exists = prev.some(n => n.message === message);
        if (exists) return prev;

        return [
          {
            id: Date.now(),
            message,
            createdAt: new Date().toISOString(),
            isRead: false,
          },
          ...prev,
        ];
      });
    };

    es.onerror = () => {
      console.error("SSE error");
      es.close();
    };

    return () => es.close();
  }, [email]);

  /* ================= DERIVED COUNT ================= */
  const unreadCount = useMemo(
    () => notifications.filter(n => !n.isRead).length,
    [notifications]
  );

  /* ================= MARK ALL READ ================= */
  const markAllRead = async () => {
    if (!email) return;

    try {
      await fetch(
        "https://posthemorrhagic-nonequilaterally-caroline.ngrok-free.dev/api/notifications/mark-all-read",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "ngrok-skip-browser-warning": "true",
          },
          body: JSON.stringify({ email }),
        }
      );

      setNotifications(prev =>
        prev.map(n => ({ ...n, isRead: true }))
      );
    } catch (err) {
      console.error("Mark all read failed", err);
    }
  };

  return (
    <NotificationContext.Provider
      value={{ notifications, unreadCount, markAllRead }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => useContext(NotificationContext);
