
import React from 'react';
import { Card, CardBody } from '@progress/kendo-react-layout';
import { Form, Field, FormElement } from '@progress/kendo-react-form';
import { Input } from '@progress/kendo-react-inputs';
import { DropDownList } from '@progress/kendo-react-dropdowns';
import { Button } from '@progress/kendo-react-buttons';

interface CommunitySectionProps {
  onSubscribe: () => void;
}

const CommunitySection: React.FC<CommunitySectionProps> = ({ onSubscribe }) => {
  const dropdownData = [
    'Daily Journaling',
    'Weekly Reflection',
    'Monthly Review'
  ];

  return (
    <div className="mx-auto max-w-2xl mt-12">
      <Card className="mb-6">
        <CardBody>
          <h3 className="text-xl font-bold mb-4">Join Our Community</h3>
          <Form
            onSubmit={() => {
              onSubscribe();
            }}
            render={(formRenderProps) => (
              <FormElement>
                <div className="mb-4">
                  <Field
                    name="email"
                    component={Input}
                    label="Email"
                    placeholder="Enter your email"
                    validator={(value) => (!value ? 'Email is required' : undefined)}
                  />
                </div>
                
                <div className="mb-4">
                  <Field
                    name="frequency"
                    component={DropDownList}
                    data={dropdownData}
                    label="Journal Frequency"
                    defaultValue="Daily Journaling"
                  />
                </div>
                
                <div className="text-right">
                  <Button
                    type="submit"
                    className="k-button k-button-md k-rounded-md k-button-solid k-button-solid-primary"
                    disabled={!formRenderProps.allowSubmit}
                  >
                    Subscribe
                  </Button>
                </div>
              </FormElement>
            )}
          />
        </CardBody>
      </Card>
    </div>
  );
};

export default CommunitySection;
