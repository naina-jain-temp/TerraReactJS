export const Loader = ({ show }) => {
  return (
    <>
      {show && (
        <div class="loading-overlay">
          <span class="fas fa-spinner fa-3x fa-spin"></span>
        </div>
      )}
    </>
  );
};
