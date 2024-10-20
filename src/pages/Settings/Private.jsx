import { useState } from "react";
import { Switch, Button } from "antd";

const Private = () => {
  const [enabled, setEnabled] = useState(false);

  const handleSwitchChange = (checked) => {
    setEnabled(checked);
  };

  return (
    <div className="flex flex-col items-center justify-center p-6 bg-white rounded-md shadow-md w-full">
      <div className="w-full max-w-lg bg-gray-50 p-6 rounded-lg shadow-sm">
        <h2 className="text-lg font-semibold mb-4">Private Account Setting</h2>
        <p className="text-sm text-gray-600 mb-4">
          If you want to make your account <span className="font-semibold">Private</span>, enable this option.
        </p>
        <div className="flex items-center justify-between">
          <Switch
            checked={enabled}
            onChange={handleSwitchChange}
            className="mr-4"
          />
          <Button type="primary" className="bg-blue-500">
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Private;
