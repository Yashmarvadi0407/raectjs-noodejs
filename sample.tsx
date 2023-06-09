import { SimpleAnimate } from "@trenchaant/pkg-ui-component-library/build/Components";
import Typography from "@trenchaant/pkg-ui-component-library/build/Components/Typography";
import {
  Button,
} from "@trenchaant/pkg-ui-component-library/build/Components";
import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

interface User {
  businesses: string[];
  company_id: string;
  country: {};
  createdAt: string;
  created_by: string;
  date_created: string;
  date_modified: string;
  default_number: string;
  email: string;
  email_signature: string;
  first_name: string;
  incoming_timeout: string;
  is_owner: boolean;
  last_name: string;
  modified_by: {};
  outgoing_message_signature: boolean;
  permissions: {};
  phone: string;
  profile: string;
  role: string;
  signature_before_quoted_text: string;
  time: {}[];
  time_zone: string;
  type: string;
  updatedAt: string;
  zoom_id: string;
  zoom_status: false;
  __v: string;
  _id: string;
}

interface Props {
  match: any;
  user: User;
  //attachment: null
}

function Error404Page(props: Props) {
  return (
    <div className="flex flex-col flex-1 items-center justify-center p-16">
      <div className="max-w-512 text-center">
        <SimpleAnimate animation="transition.expandIn" delay={100}>
          <Typography
            variant="h1"
            color="inherit"
            className="font-medium mb-16"
          >
            Sample
          </Typography>
        </SimpleAnimate>

        <SimpleAnimate delay={500}>
          <Typography variant="h5" color="textSecondary" className="mb-16">
            Welcome to Sample page
            {/* Welcome {props.user?.first_name + " " + props.user?.last_name} */}
          </Typography>
        </SimpleAnimate>
          <Link
            className="font-medium"
            to={`/register`}
          >
        <Button
          variant="contained"
          color="secondary"
          className="w-full mx-auto mt-44 normal-case py-12 text-18"
        >
            Go back to Register
        </Button>
          </Link>
        <br />

        <b>
            <Link className="font-medium" to={`/demo`}>
          <Button
            variant="contained"
            color="secondary"
            className="w-full mx-auto mt-44 normal-case py-12 text-18"
          >
              Back
          </Button>
            </Link>
        </b>
      </div>
    </div>
  );
}

// export default Error404Page;
const mapStateToProps = (state: any) => {
  return {
    user: state?.auth?.user,
    business: state?.business,
  };
};

export default connect(mapStateToProps, null)(Error404Page);
