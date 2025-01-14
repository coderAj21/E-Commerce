import React from 'react'
import { Tab } from 'rizzui'
import PersonalInformation from './personal-information'
import AddressInformation from './address-information'

const Profile = () => {
  return (
    <div className="w-full h-full my-2">
      <Tab vertical>
        <Tab.List className="w-3/12 font-medium text-base">
          <Tab.ListItem>Personal Information</Tab.ListItem>
          <Tab.ListItem>Manage  Addresses</Tab.ListItem>
          <Tab.ListItem>My Orders</Tab.ListItem>
        </Tab.List>
        <Tab.Panels className="w-full">
          <Tab.Panel>
            <PersonalInformation />
          </Tab.Panel>
          <Tab.Panel>
            <AddressInformation />
          </Tab.Panel>
          <Tab.Panel>Trending panel</Tab.Panel>
        </Tab.Panels>
      </Tab>
    </div>
  );
}

export default Profile