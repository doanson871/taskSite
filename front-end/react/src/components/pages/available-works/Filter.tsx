import React, { useEffect, useMemo, useState } from "react";
import { Form, Modal } from "react-bootstrap";
import "./styles.scss";
import { useTasksiteContext } from "../../../contexts/tasksiteContext";
import { listAddress } from "../../../utils/constant";

interface Props {
  showModal: boolean;
  handleClose: () => void;
  setFilterForm: (filter: any) => void;
}
const Filter: React.FC<Props> = ({ showModal, handleClose, setFilterForm }) => {
  const { getAllWorks } = useTasksiteContext();
  const [jobs, setjobs] = useState<any[]>([]);
  const [workId, setWorkId] = useState<number>(0);
  const [city, setCity] = useState<string>("");
  const [distric, setDistric] = useState<string>("");
  const [salary, setSalary] = useState<number>(0);

  useEffect(() => {
    getAllJobs();
    // eslint-disable-next-line
  }, []);
  const listCity = useMemo(() => {
    let _listCity = [""];
    listAddress.forEach((address) => {
      _listCity.push(address.city);
    });

    return _listCity;
    // eslint-disable-next-line
  }, [listAddress]);
  const listDistric = useMemo(() => {
    let _listDistric = [""];
    listAddress.forEach((address) => {
      if (address.city === city) {
        _listDistric = _listDistric.concat(address.district);
      }
    });
    return _listDistric;
  }, [city]);
  const getAllJobs = async () => {
    try {
      const allWorks = await getAllWorks();
      let listWork = [{ id: 0, name: "Hãy lựa chọn công việc" }, ...allWorks];
      setjobs(listWork);
    } catch (error) {
      console.log(error);
    }
  };
  const filterJob = () => {
    const filterForm = {
      workId,
      city,
      distric,
      salary,
    };
    setFilterForm(filterForm);
    handleClose();
  };

  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        onShow={() => {
          setWorkId(0);
          setSalary(0);
          setDistric("");
          setCity("");
        }}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Lọc bài viết</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="post-job container">
            <div className="row mb-2">
              <div className="col-2 fs-6 distric">Thành phố</div>
              <div className="col-4 fs-6 box-input p-0">
                <Form.Select
                  aria-label="Default select example"
                  className="select-box fs-6"
                  onChange={(e: any) => {
                    setCity(e.target.value);
                    // setDistric("Hãy chọn quận");
                  }}
                  placeholder="Hay chọn thành phố"
                >
                  {listCity.map((city, id) => (
                    <option key={id} value={city}>
                      {city}
                    </option>
                  ))}
                </Form.Select>
              </div>
              <div className="col-2 fs-6 city">Quận</div>
              <div className="col-4 fs-6 box-input p-0">
                <Form.Select
                  aria-label="Default select example"
                  className="select-box fs-6"
                  onChange={(e: any) => {
                    setDistric(e.target.value);
                  }}
                  value={distric}
                  placeholder="Hay chọn quận"
                >
                  {listDistric.map((distric, id) => (
                    <option key={id} value={distric}>
                      {distric}
                    </option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fs-6">Job</div>
              <div className="col-10 fs-6 box-input p-0">
                <Form.Select
                  aria-label="Default select example"
                  className="select-box fs-6"
                  onChange={(e: any) => {
                    setWorkId(+e.target.value);
                  }}
                >
                  {jobs.map((job) => (
                    <option value={job.id}>{job.name}</option>
                  ))}
                </Form.Select>
              </div>
            </div>
            <div className="row mb-2">
              <div className="col-2 fs-6">Thu nhập tối thiểu</div>
              <input
                type="text"
                className="col-10 cost box-input"
                value={salary}
                onChange={(e: any) => {
                  setSalary(+e.target.value);
                }}
              />
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="footer-post">
          <button className="btn btn-primary" onClick={filterJob}>
            Lọc
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
};
export default Filter;
