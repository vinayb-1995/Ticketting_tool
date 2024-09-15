import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { createTicket, reset } from "../features/tickets/ticketSlice";
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";

function NewTicket() {
  const { user } = useSelector((state) => state.auth);
  const { isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.tickets
  );

  const [name] = useState(user.name);
  const [email] = useState(user.email);
  const [product, setProduct] = useState("iPhone");
  const [description, setDescription] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess) {
      dispatch(reset());
      navigate("/tickets");
    }
  }, [dispatch, isError, isSuccess, navigate, message]);

 

  // if (isLoading) return <Spinner />;
  const [formData, setFormData] = useState({
    product: '',
    Assigned: '',
    description: '',
    file: null, // For file inputs, you might need to handle it differently
    startDateTime: '',
    endDateTime: '',
    status: '',
    WRICEF: '',
    planed_overs: '',
    planed_cost: '',
    actual_cost: '',
  });

 // Handle changes to form fields
 const onChange = (e) => {
  const { name, value, type, files } = e.target;
  setFormData((prevState) => {
    const newFormData = {
      ...prevState,
      [name]: type === 'file' ? files[0] : value, // Handle file input
    };
    console.log("Form Data (onChange):", newFormData); // Log the form data to the console
    return newFormData;
  });
};

const onSubmit = (e) => {
  e.preventDefault(); // Prevent the default form submission behavior
  console.log("Form Data (onSubmit):", formData); // Log the form data to the console
};
  return (
    <>
      <BackButton url="/" />
      <section className="heading">
        <h1>Create New Ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className="form">
        <div className="form-group">
          <label htmlFor="ID">Ticket ID</label>
          <input type="text" className="form-control" value={12345} disabled />
        </div>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Name</label>
          <input type="text" className="form-control" value={name} disabled />
        </div>
      </section>

      <section className="form">
        <div className="form-group">
          <label htmlFor="name">Customer Email</label>
          <input type="text" className="form-control" value={email} disabled />
        </div>
        {/* <form onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="product">Product</label>
            <select
              name="product"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="iPhone">iPhone</option>
              <option value="Macbook Pro">Macbook Pro</option>
              <option value="iMac">iMac</option>
              <option value="iPad">iPad</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="Assigned">Assigned to</label>
            <select
              name="Assigned"
              id="Assigned"
              value={Assigned}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="VINAY">VINAY</option>
              <option value="SAI">SAI</option>
              <option value="RAJU">RAJU</option>
              <option value="KRIShna">KRIShna</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description of the issue</label>
            <textarea
              className="form-control"
              placeholder="Description"
              value={description}
              name="description"
              id="description"
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
          </div>
          <div className="form-group">
            <label htmlFor="file">Choose File</label>
            <input
              type="file"
              id="file"
              name="file"
              value={file}
              onChange={onChange}
              placeholder="Select the file"
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="start-date-time">Start Date and Time</label>
            <input
              type="datetime-local"
              id="start-date-time"
              name="start-date-time"
              value={start-date-time}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="end-date-time">End Date and Time</label>
            <input
              type="datetime-local"
              id="end-date-time"
              name="end-date-time"
              value={end-date-time}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">status</label>
            <select
              name="status"
              id="status"
              value={status}
              onChange={onChange}     
                     >
              <option value="completed">completed</option>
              <option value="inprogress">inprogress</option>
              <option value="not strated">not strated</option>
              <option value="UAT">UAT</option>
              <option value="ACI">ACI</option>
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="WRICEF">WRICEF</label>
            <select
              name="WRICEF"
              id="WRICEF"
              value={WRICEF}
              onChange={onChange}     
            >
              <option value="workflow">workflow</option>
              <option value="report">report</option>
              <option value="interface">interface</option>
              <option value="conversion">conversion</option>
              <option value="enhacemnt">enhacemnt</option>
              <option value="function module">function module</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="planed_overs">Planed Overs</label>
            <input
              type="text"
              id="planed_overs"
              name="planed_overs"
              value={planed_overs}
              onChange={onChange}
              className="form-control"
              required
            />
          </div><div className="form-group">
            <label htmlFor="planed_cost">Planed Cost</label>
            <input
              type="text"
              id="planed_cost"
              name="planed_cost"
              value={planed_cost}
              onChange={onChange}
              className="form-control"
              required
            />
          </div><div className="form-group">
            <label htmlFor="actual_cost">actual cost</label>
            <input
              type="text"
              id="actual_cost"
              name="actual_cost"
              value={actual_cost}
              onChange={onChange}
              className="form-control"
              required
            />
          </div>
          <div className="" style={{ marginTop: "40px" }}>
            <button className="btn btn-block">Submit</button>
          </div>
        </form> */}
        <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="product">Product</label>
        <select
          name="product"
          id="product"
          value={formData.product}
          onChange={onChange}
        >
          <option value="iPhone">iPhone</option>
          <option value="Macbook Pro">Macbook Pro</option>
          <option value="iMac">iMac</option>
          <option value="iPad">iPad</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="Assigned">Assigned to</label>
        <select
          name="Assigned"
          id="Assigned"
          value={formData.Assigned}
          onChange={onChange}
        >
          <option value="VINAY">VINAY</option>
          <option value="SAI">SAI</option>
          <option value="RAJU">RAJU</option>
          <option value="KRIShna">KRIShna</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="description">Description of the issue</label>
        <textarea
          className="form-control"
          placeholder="Description"
          value={formData.description}
          name="description"
          id="description"
          onChange={onChange}
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="file">Choose File</label>
        <input
          type="file"
          id="file"
          name="file"
          onChange={onChange}
          placeholder="Select the file"
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="start-date-time">Start Date and Time</label>
        <input
          type="datetime-local"
          id="start-date-time"
          name="startDateTime"
          value={formData.startDateTime}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="end-date-time">End Date and Time</label>
        <input
          type="datetime-local"
          id="end-date-time"
          name="endDateTime"
          value={formData.endDateTime}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="status">Status</label>
        <select
          name="status"
          id="status"
          value={formData.status}
          onChange={onChange}
        >
          <option value="completed">Completed</option>
          <option value="inprogress">In Progress</option>
          <option value="not_started">Not Started</option>
          <option value="UAT">UAT</option>
          <option value="ACI">ACI</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="WRICEF">WRICEF</label>
        <select
          name="WRICEF"
          id="WRICEF"
          value={formData.WRICEF}
          onChange={onChange}
        >
          <option value="workflow">Workflow</option>
          <option value="report">Report</option>
          <option value="interface">Interface</option>
          <option value="conversion">Conversion</option>
          <option value="enhancement">Enhancement</option>
          <option value="function_module">Function Module</option>
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="planed_overs">Planned Overs</label>
        <input
          type="text"
          id="planed_overs"
          name="planed_overs"
          value={formData.planed_overs}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="planed_cost">Planned Cost</label>
        <input
          type="text"
          id="planed_cost"
          name="planed_cost"
          value={formData.planed_cost}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="actual_cost">Actual Cost</label>
        <input
          type="text"
          id="actual_cost"
          name="actual_cost"
          value={formData.actual_cost}
          onChange={onChange}
          className="form-control"
          required
        />
      </div>
      <div className="" style={{ marginTop: "40px" }}>
        <button className="btn btn-block">Submit</button>
      </div>
    </form>
      </section>
    </>
  );
}

export default NewTicket;
