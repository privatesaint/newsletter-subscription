import catchAsyncError from "../middleware/catchAsyncError";
import SubscribeService from "../services/Subscriber";

export const subscribe = catchAsyncError(async (req, res) => {
  await SubscribeService.create(req.body);

  return res.status(200).json({
    success: true,
    msg: "Successful subscribed to maillist",
  });
});

export const unsubscribe = catchAsyncError(async (req, res) => {
  await SubscribeService.destroy(req.body);

  return res.status(200).json({
    success: true,
    msg: "Successful Unsubscribe",
  });
});
