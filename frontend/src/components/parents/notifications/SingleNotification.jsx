import './singlenotification.css';
import { useState } from 'react';
import axios from 'axios';

function SingleNotification({ info }) {
    const [motif, setMotif] = useState('');
    const [loading, setLoading] = useState(false);
    const [motifFile, setMotifFile] = useState(null);
    const handleJustificationSubmit = async () => {
        console.log(motif);


        if (motif || motifFile) {
            try {
                setLoading(true);
                await axios.post(`http://localhost:5000/api/absences/justify`, {
                    absenceId: info.related_entity_id,
                    parentId: info.user_id,
                    justificationText: motif,
                    filePath: null
                });
                alert('justification sent with success ');
                setMotif('');
            } catch (error) {
                console.error('Failed to send justification:', error);
                alert('Failed to mark as read');
            }

        }

        else {
            try {
                setLoading(true);
                await axios.patch(`http://localhost:5000/api/notifications/${info.id}/${info.user_id}`);
                alert('notification marked as read successfully');
                setMotif('');
            } catch (error) {
                console.error('Failed to mark as read:', error);
                alert('Failed to mark as read');
            } finally {
                setLoading(false);
            }
        }


    };

    return (
        <div className="single-notification">
            <div className="icon">!</div>
            <span className="report">{info.type} </span>
            {info.message}

            <div className="action-link-input">
                <input
                    type="text"
                    placeholder="Enter justification"
                    value={motif}
                    onChange={(e) => setMotif(e.target.value)}
                />

                {/* Styled File Input */}
                <label className="file-upload-btn">
                    {motifFile ? motifFile.name : "Upload File"}

                    <input
                        type="file"
                        style={{ display: "none" }}
                        onChange={(e) => setMotifFile(e.target.files[0])}
                    />
                </label>

                <button onClick={handleJustificationSubmit} disabled={loading}>
                    {motif
                        ? 'Send Motif'
                        : loading
                            ? 'Sending...'
                            : 'Mark as Seen'}
                </button>
            </div>
        </div>

    );
}

export default SingleNotification;
