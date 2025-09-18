import { useState } from 'react';
import { sendTask } from '../api';

export default function TaskSender() {
  const [msg, setMsg] = useState('');

  const handleSend = async () => {
    const res = await sendTask(msg);
    console.log('Task sent successfully', res);
  };

  return (
    <div>
      <h1>TaskSender</h1>
      <input type='text' value={msg} onChange={(e) => setMsg(e.target.value)} />
      <button onClick={handleSend}>Send Task</button>
    </div>
  );
}
