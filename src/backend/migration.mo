import List "mo:core/List";

module {
  type OldRestaurantInfo = {
    name : Text;
    tagline : Text;
    address : Text;
    phone : Text;
    email : Text;
    openingHours : Text;
  };

  type OldContactMessage = {
    name : Text;
    email : Text;
    message : Text;
  };

  type OldActor = {
    contactMessages : List.List<OldContactMessage>;
    restaurant : ?OldRestaurantInfo;
  };

  type NewBooking = {
    name : Text;
    email : Text;
    phone : Text;
    preferredDate : Text;
    serviceType : Text;
    message : Text;
  };

  type NewContactMessage = {
    name : Text;
    email : Text;
    phone : Text;
    message : Text;
  };

  type NewActor = {
    bookings : List.List<NewBooking>;
    contactMessages : List.List<NewContactMessage>;
  };

  public func run(old : OldActor) : NewActor {
    let contactMessages = old.contactMessages.map<OldContactMessage, NewContactMessage>(
      func(oldContactMessage) {
        {
          oldContactMessage with
          phone = "";
        };
      }
    );
    {
      bookings = List.empty<NewBooking>();
      contactMessages;
    };
  };
};
