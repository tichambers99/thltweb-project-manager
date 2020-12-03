import React, { useState } from 'react';

import { Card, Modal, Button, Input, Upload } from 'antd';
import { CommentOutlined, EllipsisOutlined, BellOutlined, UploadOutlined } from '@ant-design/icons';

import Logo from '../../images/logo.png';

const Task = () => {
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [fileList, setFileList] = useState(
    [
      {
        uid: '-1',
        name: 'xxx.png',
        status: 'done',
        url: 'https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4',
      },
  ]);

  const props = {
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    onChange: (info) => handleChange(info),
    multiple: true,
  };

  const handleChange = info => {
    let fileList = [...info.fileList];

    // 1. Limit the number of uploaded files
    // Only to show two recent uploaded files, and old ones will be replaced by the new
    fileList = fileList.slice(-2);

    // 2. Read from response and show file link
    fileList = fileList.map(file => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };

  const showModal = () => {
    setVisible(true);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };
  
  return (
    <div>
      <Card
        className="card"
        onClick={() => showModal()}
        cover={
          <img
            alt="example"
            src={Logo}
          />
        }
        actions={[
          <BellOutlined key="bell"/>,
          <CommentOutlined key="comment" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
      <p>description</p>
      </Card>
      <Modal
        visible={visible}
        title={
          <div className="task-title"> 
            <h3>Task's title</h3>
            <p className="task-subtitle">Project's name</p>
            <p className="task-member">Member</p>
          </div>
        }
        onOk={() => handleOk()}
        onCancel={() => handleCancel()}
        footer={[
          <Button key="back" onClick={() => handleCancel()}>
            Cancel
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={() => handleOk()}>
            Save
          </Button>,
        ]}
      >
        <div className="task-description">
          <p className="task-desc-title">Description</p>
          <Input size="large" placeholder="Add description"/>
        </div>
        <div className="task-attachment">
          <p className="task-attach-title">Add attachment</p>
          <Upload {...props} fileList={fileList}>
            <Button icon={<UploadOutlined />}>Upload</Button>
          </Upload>
        </div>
        <div className="task-comment">
          <p className="task-com-title">Comment</p>
          <div className="user-comment">
            <div className="user-info">
              <div className="user-avatar">
                <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" alt="avatar" />
              </div>
              <div className="user-subinfo">
                <p className="user-name">Username</p>
                <p className="time-comment">5 hours ago</p>
              </div>
            </div>
            <p>Comment.....</p>
          </div>
          <div className="user-comment">
            <div className="user-info">
              <div className="user-avatar">
                <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" alt="avatar" />
              </div>
              <div className="user-subinfo">
                <p className="user-name">Username</p>
                <p className="time-comment">5 hours ago</p>
              </div>
            </div>
            <p>Comment.....</p>
          </div>
          <div className="user-comment">
            <div className="user-info">
              <div className="user-avatar">
                <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" alt="avatar" />
              </div>
              <div className="user-subinfo">
                <p className="user-name">Username</p>
                <p className="time-comment">5 hours ago</p>
              </div>
            </div>
            <p>Comment.....</p>
          </div>
          <div className="user-comment">
            <div className="user-info">
              <div className="user-avatar">
                <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" alt="avatar" />
              </div>
              <div className="user-subinfo">
                <p className="user-name">Username</p>
                <p className="time-comment">5 hours ago</p>
              </div>
            </div>
            <p>Comment.....</p>
          </div>
          <div className="user-comment">
            <div className="user-info">
              <div className="user-avatar">
                <img src="https://avatars3.githubusercontent.com/u/53306165?s=460&u=706dee5c711d231bedc74f2692893c97be67b164&v=4" alt="avatar" />
              </div>
              <div className="user-subinfo">
                <p className="user-name">Username</p>
                <p className="time-comment">5 hours ago</p>
              </div>
            </div>
            <p>Comment.....</p>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default Task;