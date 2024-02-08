import axios from "axios";
import useCustomForm from "../../hooks/useCustomForm";
import useAuth from "../../hooks/useAuth";

const EditEntryForm = ({ entry, setEditingEntryId, fetchEntries }) => {
  const { config } = useAuth();
  const handleUpdate = async (updatedData) => {
    try {
      const response = await axios.put(
        `https://localhost:5001/api/Entries/${entry.id}`,
        updatedData,
        config
      );

      setEditingEntryId(null);
      fetchEntries();
    } catch (error) {
      console.error("Error updating entry:", error.response.data);
    }
  };

  const [formData, handleInputChange, handleSubmit, reset] = useCustomForm(
    handleUpdate,
    entry
  );
  return (
    <form onSubmit={handleSubmit}>
      <input
        className="form-control"
        type="text"
        name="title"
        value={formData.title}
        onChange={(e) => handleInputChange(e, entry.id)}
      />
      <input
        className="form-control"
        type="text"
        name="entryContent"
        value={formData.entryContent}
        onChange={(e) => handleInputChange(e, entry.id)}
      />

      <button className="btn btn-primary">Update</button>
    </form>
  );
};

export default EditEntryForm;
