export const PageContent = ({
  PageComponent,
  userDetails,
  reloading,
  cookies,
}) => {
  return (
    <div className="PageContent">
      <PageComponent
        userInfo={userDetails}
        reloading={reloading}
        cookies={cookies}
      />
    </div>
  );
};
