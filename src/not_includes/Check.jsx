import React, { useEffect, useState } from 'react';
import { Avatar, List, message } from 'antd';
import VirtualList from 'rc-virtual-list';

const fakeDataUrl = 'https://randomuser.me/api/?results=20&inc=name,gender,email,nat,picture&noinfo';
const ContainerHeight = 400;

const Check = () => {
  const [data, setData] = useState([]);

  const appendData = () => {
    fetch(fakeDataUrl)
      .then((res) => res.json())
      .then((body) => {
        setData(data.concat(body.results));
        message.success(`${body.results.length} more items loaded!`);
      });
  };

  useEffect(() => {
    appendData();
  }, []);

  const onScroll = (e) => {
    if (Math.abs(e.currentTarget.scrollHeight - e.currentTarget.scrollTop - ContainerHeight) <= 1) {
      appendData();
    }
  };

  const handleItemClick = (item) => {
    console.log(item.name.last);
  };

  return (
    <List>
      <VirtualList
        data={data}
        height={ContainerHeight}
        itemHeight={47}
        itemKey="email"
        onScroll={onScroll}
      >
        {(item) => (
          <List.Item
            key={item.email}
            onClick={() => handleItemClick(item)}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.picture.large} />}
              title={item.name.last}
              description={item.email}
            />
            <div>Content</div>
          </List.Item>
        )}
      </VirtualList>
    </List>
  );
};

export default Check;
