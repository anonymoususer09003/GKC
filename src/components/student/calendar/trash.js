<div className={`row ${styles.calendarWrapper}`}>
<div className="col-12 col-lg-6 pt-5">
<Calendar 
    onClickDay={onCalendarClick}
  />
  {/* 
        <Calendar 
    onClickDay={onCalendarClick}
    value={value} 
    tileDisabled={tileDisabled}
    tileClassName={tileContent}
  />
  */}
</div>

<div className="col-12 col-lg-6">
  <h3 className={`text-center ${styles.scheduleHeader}` } >Schedule</h3>
  <div
    className={`shadow p-5 bg-white rounded ${styles.scheduleBox}`}
    style={{ minHeight: "400px" }}
  >
    <div
      onClick={() => openChat(1)}
      className="d-flex align-items-center py-3 gap-2"
    >
      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
        Ticher Name 
       </h6>
      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">11:00AM</h6>
      <BsFillChatFill
        className="p-0 m-0 flex-fill h4 flex-fill"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      />

      <GoDeviceCameraVideo
        className="p-0 m-0 flex-fill h4 flex-fill"
        onClick={() => onContinue()}
      />

      <RiDeleteBin6Line className="p-0 m-0 h4 flex-fill" />
    </div>
    <div className="d-flex align-items-center py-3 gap-2">
      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">
        John Doe
      </h6>
      <h6 className="p-0 m-0 flex-fill fw-bold flex-fill">11:00AM</h6>
      <BsFillChatFill
        className="p-0 m-0 flex-fill h4 flex-fill"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal2"
      />

      <GoDeviceCameraVideo
        className="p-0 m-0 flex-fill h4 flex-fill"
        onClick={() => onContinue()}
      />

      <RiDeleteBin6Line className="p-0 m-0 h4 flex-fill" />
    </div>
  </div>
</div>
</div>